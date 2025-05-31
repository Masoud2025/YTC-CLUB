import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

export async function GET() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }

  const data = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(data);

  return NextResponse.json(users);
}
