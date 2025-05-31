// app/api/zarinpal/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const response = await axios.post(
    'https://api.zarinpal.com/pg/v4/payment/request.json',
    {
      merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15',
      amount: 100000, // به ریال
      callback_url: 'http://localhost:3000/verify',
      description: 'پرداخت تستی',
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
      url: `https://www.zarinpal.com/pg/StartPay/${data.authority}`,
    });
  } else {
    return NextResponse.json({ error: 'خطا در ایجاد پرداخت' }, { status: 500 });
  }
}
