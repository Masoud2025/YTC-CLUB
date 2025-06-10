/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const { authority, packId } = await request.json();

    if (!authority || !packId) {
      return NextResponse.json(
        { success: false, message: 'اطلاعات ناقص' },
        { status: 400 },
      );
    }

    // Find transaction in database
    const db = readDatabase();
    const transaction = db.purchases.find(
      (purchase: any) =>
        purchase.authority === authority && purchase.packId === packId,
    );

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: 'تراکنش یافت نشد' },
        { status: 404 },
      );
    }

    if (transaction.status === 'completed') {
      // Get pack info
      const packsData = readPacksData();
      const pack = packsData.packs.find((p: any) => p.id === packId);

      return NextResponse.json({
        success: true,
        message: 'این پرداخت قبلاً تایید شده است',
        packInfo: pack ? { title: pack.title, id: pack.id } : null,
      });
    }

    // Verify with ZarinPal
    const verifyResponse = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/verify.json',
      {
        merchant_id: '151cabb5-8fb6-4287-adde-29173c2a2e15',
        authority: authority,
        amount: transaction.amount,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { data } = verifyResponse.data;

    if (data.code === 100 || data.code === 101) {
      // Payment successful - update transaction status
      const transactionIndex = db.purchases.findIndex(
        (purchase: any) => purchase.authority === authority,
      );

      if (transactionIndex >= 0) {
        db.purchases[transactionIndex] = {
          ...db.purchases[transactionIndex],
          status: 'completed',
          completedAt: new Date().toISOString(),
          refId: data.ref_id,
          cardHash: data.card_hash || null,
          cardPan: data.card_pan || null,
        };

        writeDatabase(db);
      }

      // Get pack info
      const packsData = readPacksData();
      const pack = packsData.packs.find((p: any) => p.id === packId);

      return NextResponse.json({
        success: true,
        message: 'پرداخت با موفقیت تایید شد',
        refId: data.ref_id,
        packInfo: pack ? { title: pack.title, id: pack.id } : null,
      });
    } else {
      // Payment failed - update transaction status
      const transactionIndex = db.purchases.findIndex(
        (purchase: any) => purchase.authority === authority,
      );

      if (transactionIndex >= 0) {
        db.purchases[transactionIndex] = {
          ...db.purchases[transactionIndex],
          status: 'failed',
          failedAt: new Date().toISOString(),
          failureReason: data.message || 'پرداخت ناموفق',
        };

        writeDatabase(db);
      }

      return NextResponse.json({
        success: false,
        message: data.message || 'پرداخت تایید نشد',
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در تایید پرداخت' },
      { status: 500 },
    );
  }
}
