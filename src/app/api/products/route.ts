import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  const data = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(data);
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const newProduct = await req.json();
  const data = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(data);

  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return NextResponse.json({ success: true });
}
