/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const body = await req.json();
  const { authority } = body;

  try {
    const response = await axios.post(
      'https://api.zarinpal.com/pg/v4/payman/verify.json',
      {
        merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15',
        payman_authority: authority,
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
        success: true,
        signature: data.signature,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message,
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: 'خطای غیرمنتظره',
    });
  }
}
