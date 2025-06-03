/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const pendingPath = path.join(process.cwd(), 'data', 'ads-pending.json');
const approvedPath = path.join(process.cwd(), 'data', 'ads-approved.json');

export async function POST(req: Request) {
  const approvedAd = await req.json();

  let pendingAds = fs.existsSync(pendingPath)
    ? JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
    : [];

  let approvedAds = fs.existsSync(approvedPath)
    ? JSON.parse(fs.readFileSync(approvedPath, 'utf-8'))
    : [];

  pendingAds = pendingAds.filter(
    (ad: { title: any }) => ad.title !== approvedAd.title,
  );
  approvedAds.push(approvedAd);

  fs.writeFileSync(pendingPath, JSON.stringify(pendingAds, null, 2));
  fs.writeFileSync(approvedPath, JSON.stringify(approvedAds, null, 2));

  return NextResponse.json({ message: 'تایید شد' });
}
