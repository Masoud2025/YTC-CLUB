import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const pendingPath = path.join(process.cwd(), 'data', 'ads-pending.json');

export async function POST(req: Request) {
  const newAd = await req.json();

  const data = fs.existsSync(pendingPath)
    ? JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
    : [];

  data.push(newAd);
  fs.writeFileSync(pendingPath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: 'آگهی ثبت شد' });
}
