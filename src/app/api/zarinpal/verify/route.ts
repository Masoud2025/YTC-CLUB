// app/api/zarinpal/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const authority = searchParams.get('Authority');
  const status = searchParams.get('Status');

  if (status !== 'OK' || !authority) {
    return NextResponse.json({
      success: false,
      message: 'پرداخت لغو شد یا Authority نامعتبر بود',
    });
  }

  const response = await axios.post(
    'https://api.zarinpal.com/pg/v4/payment/verify.json', // ✅ آدرس واقعی
    {
      merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15', // ✅ مرچنت واقعی شما
      amount: 10000, // ریال
      authority,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const { data } = response.data;

  if (data.code === 100) {
    return NextResponse.json({ success: true, ref_id: data.ref_id });
  } else {
    return NextResponse.json({
      success: false,
      message: 'پرداخت تأیید نشد',
      error: data.message,
    });
  }
}
