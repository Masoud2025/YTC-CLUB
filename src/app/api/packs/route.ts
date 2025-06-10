/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'editingPacks.json');

// Helper function to read data
function readPacksData() {
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { packs: [] };
  }
}

// Helper function to write data
function writePacksData(data: any) {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET - Get all packs
export async function GET() {
  try {
    const data = readPacksData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read packs' },
      { status: 500 },
    );
  }
}

// POST - Create new pack
export async function POST(request: NextRequest) {
  try {
    const newPack = await request.json();
    const data = readPacksData();

    // Generate ID
    const id = `pack-${Date.now()}`;
    const packWithId = {
      ...newPack,
      id,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    data.packs.push(packWithId);
    writePacksData(data);

    return NextResponse.json(packWithId);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create pack' },
      { status: 500 },
    );
  }
}

// PUT - Update pack
export async function PUT(request: NextRequest) {
  try {
    const updatedPack = await request.json();
    const data = readPacksData();

    const index = data.packs.findIndex(
      (pack: any) => pack.id === updatedPack.id,
    );
    if (index === -1) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    data.packs[index] = { ...data.packs[index], ...updatedPack };
    writePacksData(data);

    return NextResponse.json(data.packs[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update pack' },
      { status: 500 },
    );
  }
}

// DELETE - Delete pack
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Pack ID required' }, { status: 400 });
    }

    const data = readPacksData();
    const index = data.packs.findIndex((pack: any) => pack.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    data.packs.splice(index, 1);
    writePacksData(data);

    return NextResponse.json({ message: 'Pack deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete pack' },
      { status: 500 },
    );
  }
}
