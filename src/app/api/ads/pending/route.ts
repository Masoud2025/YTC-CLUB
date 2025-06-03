import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const pendingPath = path.join(process.cwd(), 'data', 'ads-pending.json');

export async function GET() {
  const data = fs.existsSync(pendingPath)
    ? JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
    : [];

  return NextResponse.json(data);
}
