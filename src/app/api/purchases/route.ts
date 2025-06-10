/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const purchasesPath = path.join(process.cwd(), 'data', 'purchases.json');

// Helper function to read purchases data
function readPurchasesData() {
  try {
    const fileContents = fs.readFileSync(purchasesPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { purchases: [] };
  }
}

// Helper function to write purchases data
function writePurchasesData(data: any) {
  const dir = path.dirname(purchasesPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(purchasesPath, JSON.stringify(data, null, 2));
}

// GET - Get user purchases
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userPhone = searchParams.get('userPhone');
    const packId = searchParams.get('packId');

    const data = readPurchasesData();

    if (userPhone && packId) {
      // Check if user has purchased specific pack
      const purchase = data.purchases.find(
        (p: any) =>
          p.userPhone === userPhone &&
          p.packId === packId &&
          p.status === 'completed',
      );
      return NextResponse.json({ hasPurchased: !!purchase, purchase });
    }

    if (userPhone) {
      // Get all purchases for user
      const userPurchases = data.purchases.filter(
        (p: any) => p.userPhone === userPhone,
      );
      return NextResponse.json({ purchases: userPurchases });
    }

    // Get all purchases (admin)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read purchases' },
      { status: 500 },
    );
  }
}

// POST - Create purchase record
export async function POST(request: NextRequest) {
  try {
    const purchaseData = await request.json();
    const data = readPurchasesData();

    const newPurchase = {
      id: `purchase-${Date.now()}`,
      ...purchaseData,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, completed, failed
    };

    data.purchases.push(newPurchase);
    writePurchasesData(data);

    return NextResponse.json(newPurchase);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create purchase' },
      { status: 500 },
    );
  }
}

// PUT - Update purchase status
export async function PUT(request: NextRequest) {
  try {
    const { id, status, transactionId } = await request.json();
    const data = readPurchasesData();

    const index = data.purchases.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 },
      );
    }

    data.purchases[index] = {
      ...data.purchases[index],
      status,
      transactionId,
      completedAt: status === 'completed' ? new Date().toISOString() : null,
    };

    writePurchasesData(data);
    return NextResponse.json(data.purchases[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update purchase' },
      { status: 500 },
    );
  }
}
