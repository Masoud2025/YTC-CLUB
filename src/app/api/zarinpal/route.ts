/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/zarinpal/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const response = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/request.json', // ✅ آدرس واقعی
      {
        merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15', // ✅ مرچنت واقعی
        amount: 10000, // مبلغ به ریال
        callback_url: 'http://localhost:3000/verify', // ❗ بعداً باید دامنه واقعی رو بزاری
        description: 'پرداخت واقعی تستی',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { data } = response.data;

    if (data.code === 100) {
      return NextResponse.json({
        url: `https://www.zarinpal.com/pg/StartPay/${data.authority}`, // ✅ آدرس درگاه واقعی
      });
    } else {
      return NextResponse.json(
        { error: data.message || 'خطا در ایجاد پرداخت' },
        { status: 500 },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
