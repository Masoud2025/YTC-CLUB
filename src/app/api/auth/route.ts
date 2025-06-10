import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const verifyCodesFilePath = path.join(
  process.cwd(),
  'data',
  'verifyCodes.json',
);

type User = {
  name: string;
  phone: string;
  id?: number;
  createdAt?: string;
};

type VerifyCode = {
  phone: string;
  code: number;
  timestamp: number;
};

// Helper function to ensure file exists
function ensureFileExists(filePath: string, defaultContent: string = '[]') {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent);
  }
}

// Helper function to read JSON file
function readJsonFile<T>(filePath: string): T[] {
  ensureFileExists(filePath);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write JSON file
function writeJsonFile<T>(filePath: string, data: T[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, code, action } = body;

    // Validate phone number (always required)
    if (!phone) {
      return NextResponse.json(
        { error: 'شماره تلفن الزامی است' },
        { status: 400 },
      );
    }

    const users: User[] = readJsonFile<User>(usersFilePath);
    const existingUser = users.find(u => u.phone === phone);

    switch (action) {
      case 'check-user':
        // Step 1: Check if user exists
        if (existingUser) {
          return NextResponse.json({
            success: true,
            userExists: true,
            message: 'کاربر موجود است',
            requiresName: !existingUser.name, // In case name is missing
          });
        } else {
          // Generate verification code for new user
          const verificationCode = Math.floor(100000 + Math.random() * 900000);

          const verifyCodes: VerifyCode[] =
            readJsonFile<VerifyCode>(verifyCodesFilePath);

          // Remove any existing codes for this phone
          const filteredCodes = verifyCodes.filter(
            entry => entry.phone !== phone,
          );

          // Add new code
          filteredCodes.push({
            phone,
            code: verificationCode,
            timestamp: Date.now(),
          });

          writeJsonFile(verifyCodesFilePath, filteredCodes);

          // Log code for development (remove in production)
          console.log(`Verification code for ${phone}: ${verificationCode}`);

          return NextResponse.json({
            success: true,
            userExists: false,
            message: 'کد تأیید ارسال شد',
            // Remove this line in production
            devCode: verificationCode,
          });
        }

      case 'login':
        // Step 2: Direct login for existing user
        if (!name) {
          return NextResponse.json(
            { error: 'نام الزامی است' },
            { status: 400 },
          );
        }

        if (existingUser && existingUser.name === name) {
          return NextResponse.json({
            success: true,
            message: 'ورود موفق',
            user: existingUser,
          });
        } else if (existingUser && existingUser.name !== name) {
          return NextResponse.json(
            {
              error: 'نام وارد شده صحیح نیست',
            },
            { status: 401 },
          );
        } else {
          return NextResponse.json(
            {
              error: 'کاربر یافت نشد',
            },
            { status: 404 },
          );
        }

      case 'verify-signup':
        // Step 3: Verify code and create new user
        if (!name || !code) {
          return NextResponse.json(
            {
              error: 'نام و کد تأیید الزامی است',
            },
            { status: 400 },
          );
        }

        const verifyCodes: VerifyCode[] =
          readJsonFile<VerifyCode>(verifyCodesFilePath);
        const matchingCode = verifyCodes.find(
          entry => entry.phone === phone && entry.code === parseInt(code),
        );

        if (matchingCode) {
          // Check if code is not expired (optional - 10 minutes)
          const codeAge = Date.now() - matchingCode.timestamp;
          const maxAge = 10 * 60 * 1000; // 10 minutes

          if (codeAge > maxAge) {
            return NextResponse.json(
              {
                error: 'کد تأیید منقضی شده است',
              },
              { status: 401 },
            );
          }

          // Create new user
          const newUser: User = {
            id: Date.now(),
            name,
            phone,
            createdAt: new Date().toISOString(),
          };

          users.push(newUser);
          writeJsonFile(usersFilePath, users);

          // Remove used verification code
          const updatedCodes = verifyCodes.filter(
            entry => !(entry.phone === phone && entry.code === parseInt(code)),
          );
          writeJsonFile(verifyCodesFilePath, updatedCodes);

          return NextResponse.json({
            success: true,
            message: 'ثبت‌نام موفق بود',
            user: newUser,
          });
        } else {
          return NextResponse.json(
            {
              error: 'کد تأیید نادرست است',
            },
            { status: 401 },
          );
        }

      default:
        // Fallback to original behavior if no action specified
        if (!name) {
          return NextResponse.json({ error: 'اطلاعات ناقصه' }, { status: 400 });
        }

        if (existingUser && existingUser.name === name) {
          return NextResponse.json({ message: 'ورود موفق' });
        } else {
          // ثبت‌نام کاربر جدید (original logic)
          const newUser: User = { name, phone };
          users.push(newUser);
          writeJsonFile(usersFilePath, users);
          return NextResponse.json({ message: 'ثبت‌نام موفق بود' });
        }
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json(
      {
        error: 'خطا در سرور',
      },
      { status: 500 },
    );
  }
}
