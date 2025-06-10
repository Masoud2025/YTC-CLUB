/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/zarinpal-pack/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Helper function to read JSON database
function readDatabase() {
  const dbPath = path.join(process.cwd(), 'data', 'subscriptions.json');
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with empty structure
    const initialData = { subscriptions: [], transactions: [], purchases: [] };
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

// Helper function to write to JSON database
function writeDatabase(data: any) {
  const dbPath = path.join(process.cwd(), 'data', 'subscriptions.json');
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Helper function to read packs data
function readPacksData() {
  const packsPath = path.join(process.cwd(), 'data', 'editingPacks.json');
  try {
    const data = fs.readFileSync(packsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { packs: [] };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, packId, packTitle, userData, purchaseId } = body;

    if (!amount || !packId || !packTitle) {
      return NextResponse.json(
        { error: 'اطلاعات ناقص ارسال شده است' },
        { status: 400 },
      );
    }

    // Check if user data is provided and valid
    if (!userData || !userData.name || !userData.phone) {
      return NextResponse.json(
        { error: 'اطلاعات کاربری ناقص است. لطفاً وارد حساب کاربری خود شوید' },
        { status: 401 },
      );
    }

    // Verify pack exists and is active
    const packsData = readPacksData();
    const pack = packsData.packs.find((p: any) => p.id === packId);

    if (!pack) {
      return NextResponse.json(
        { error: 'پک مورد نظر یافت نشد' },
        { status: 404 },
      );
    }

    if (!pack.isActive) {
      return NextResponse.json(
        { error: 'این پک در حال حاضر غیرفعال است' },
        { status: 400 },
      );
    }

    // Check if user has already purchased this pack
    const db = readDatabase();
    if (!db.purchases) {
      db.purchases = [];
    }

    const existingPurchase = db.purchases.find(
      (purchase: any) =>
        purchase.userData.phone === userData.phone &&
        purchase.packId === packId &&
        purchase.status === 'completed',
    );

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'شما قبلاً این پک را خریداری کرده‌اید' },
        { status: 400 },
      );
    }

    // Generate unique transaction ID
    const transactionId =
      purchaseId ||
      `pack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const response = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/request.json',
      {
        merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15',
        amount: amount, // Amount in Rial
        callback_url: `${
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }/verify-pack?packId=${packId}`, // Updated callback URL with packId
        description: `خرید پک آموزشی: ${packTitle} - ${userData.name}`,
        metadata: {
          pack_id: packId,
          pack_title: packTitle,
          transaction_id: transactionId,
          user_name: userData.name,
          user_phone: userData.phone,
          type: 'pack_purchase',
          purchase_id: purchaseId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { data } = response.data;

    if (data.code === 100) {
      // Save/Update transaction in JSON database
      const existingTransactionIndex = db.purchases.findIndex(
        (purchase: any) => purchase.id === transactionId,
      );

      const transactionData = {
        id: transactionId,
        authority: data.authority,
        packId,
        packTitle,
        amount,
        userData: {
          name: userData.name,
          phone: userData.phone,
          email: userData.email || null,
        },
        status: 'pending',
        type: 'pack_purchase',
        createdAt:
          existingTransactionIndex >= 0
            ? db.purchases[existingTransactionIndex].createdAt
            : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (existingTransactionIndex >= 0) {
        // Update existing transaction
        db.purchases[existingTransactionIndex] = {
          ...db.purchases[existingTransactionIndex],
          ...transactionData,
        };
      } else {
        // Add new transaction
        db.purchases.push(transactionData);
      }

      writeDatabase(db);

      return NextResponse.json({
        url: `https://www.zarinpal.com/pg/StartPay/${data.authority}`,
        transactionId,
        packId,
      });
    } else {
      return NextResponse.json(
        { error: data.message || 'خطا در ایجاد پرداخت' },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error('ZarinPal Pack API Error:', error);
    return NextResponse.json(
      { error: 'خطا در برقراری ارتباط با درگاه پرداخت' },
      { status: 500 },
    );
  }
}
