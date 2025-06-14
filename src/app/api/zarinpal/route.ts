/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/zarinpal/route.ts
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
    const initialData = { subscriptions: [], transactions: [] };
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
    const { amount, planId, planName } = body;

    if (!amount || !planId || !planName) {
      return NextResponse.json(
        { error: 'اطلاعات ناقص ارسال شده است' },
        { status: 400 },
      );
    }

    // Generate unique transaction ID
    const transactionId = `txn_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const response = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/request.json',
      {
        merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15',
        amount: amount, // Amount in Rial
        callback_url: `${
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }/verify`,
        description: `خرید اشتراک ${planName}`,
        metadata: {
          plan_id: planId,
          plan_name: planName,
          transaction_id: transactionId,
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
      const newTransaction = {
        id: transactionId,
        authority: data.authority,
        planId,
        planName,
        amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      db.transactions.push(newTransaction);
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
    console.error('ZarinPal API Error:', error);
    return NextResponse.json(
      { error: 'خطا در برقراری ارتباط با درگاه پرداخت' },
      { status: 500 },
    );
  }
}
