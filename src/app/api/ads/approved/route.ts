import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const approvedPath = path.join(process.cwd(), 'data/ads-approved.json');

export async function GET() {
  try {
    const data = fs.readFileSync(approvedPath, 'utf-8');
    const ads = JSON.parse(data);

    if (!Array.isArray(ads)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(ads);
  } catch (err) {
    console.error('خطا در خواندن فایل آگهی تایید شده:', err);
    return NextResponse.json([], { status: 200 });
  }
}
