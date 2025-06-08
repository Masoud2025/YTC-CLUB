/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const filePath = path.join(process.cwd(), 'data', 'verifyCodes.json');

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  const code = Math.floor(100000 + Math.random() * 900000);

  try {
    // ارسال SMS
    await axios.post(
      'https://api.sms.ir/v1/send/verify',
      {
        mobile: phone,
        templateId: 318284,
        parameters: [{ name: 'code', value: code }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain',
          'x-api-key': 'Q8dhVioK5klJBNvDLYaFihGUE27o7gj9xcAGXVwjdUtgpMtW',
        },
      },
    );

    // ذخیره شماره و کد در فایل
    const data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];

    const newData = data.filter((entry: any) => entry.phone !== phone);
    newData.push({ phone, code });

    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.response?.data || error.message },
      { status: 500 },
    );
  }
}
