import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, mobile, password } = await req.json();

  if (!name || !mobile || !password) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 400 },
    );
  }

  // چک کردن کاربر تکراری
  const exists = await prisma.user.findUnique({ where: { mobile } });
  if (exists) {
    return NextResponse.json(
      { error: 'Mobile already registered.' },
      { status: 400 },
    );
  }

  // ثبت کاربر جدید
  const user = await prisma.user.create({
    data: { name, mobile, password },
  });

  return NextResponse.json({ message: 'User registered!', user });
}
