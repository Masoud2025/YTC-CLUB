import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export async function DELETE(
  req: Request,
  contextPromise: Promise<{ params: { id: string } }>,
) {
  const { params } = await contextPromise;
  const id = parseInt(params.id);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const data = fs.readFileSync(filePath, 'utf8');
  let products = JSON.parse(data);

  products = products.filter((p: { id: number }) => p.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

  return NextResponse.json({ success: true });
}
