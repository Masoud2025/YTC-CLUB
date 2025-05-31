import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

type User = {
  name: string;
  phone: string;
};

export async function POST(req: Request) {
  const { name, phone }: User = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ error: 'اطلاعات ناقصه' }, { status: 400 });
  }

  // اگر فایل نبود بسازش
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }

  const data = fs.readFileSync(filePath, 'utf8');
  const users: User[] = JSON.parse(data);

  const existingUser = users.find(u => u.name === name && u.phone === phone);

  if (existingUser) {
    return NextResponse.json({ message: 'ورود موفق' });
  } else {
    // ثبت‌نام کاربر جدید
    users.push({ name, phone });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return NextResponse.json({ message: 'ثبت‌نام موفق بود' });
  }
}
