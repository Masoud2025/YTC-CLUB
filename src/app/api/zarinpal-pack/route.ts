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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, packId, packTitle, userData } = body;

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

    // Generate unique transaction ID
    const transactionId = `pack_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const response = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/request.json',
      {
        merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15',
        amount: amount, // Amount in Rial
        callback_url: `${
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }/verify`, // Use your existing verify page
        description: `خرید پک آموزشی: ${packTitle} - ${userData.name}`,
        metadata: {
          pack_id: packId,
          pack_title: packTitle,
          transaction_id: transactionId,
          user_name: userData.name,
          user_phone: userData.phone,
          type: 'pack_purchase',
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
      // Save transaction to JSON database
      const db = readDatabase();
      if (!db.purchases) {
        db.purchases = [];
      }

      const newTransaction = {
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
        createdAt: new Date().toISOString(),
      };

      db.purchases.push(newTransaction);
      writeDatabase(db);

      return NextResponse.json({
        url: `https://www.zarinpal.com/pg/StartPay/${data.authority}`,
        transactionId,
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
