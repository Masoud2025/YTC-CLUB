/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'verifyCodes.json');

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();

  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : [];

  const match = data.find(
    (entry: any) =>
      entry.phone === phone && String(entry.code) === String(code),
  );

  if (match) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, error: 'کد نادرست است' },
      { status: 401 },
    );
  }
}
