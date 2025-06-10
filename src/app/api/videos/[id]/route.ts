/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'videos.json');

// PUT - Update video
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    const updatedData = await request.json();

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const videoIndex = data.videos.findIndex((v: any) => v.id === id);
    if (videoIndex === -1) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    data.videos[videoIndex] = {
      ...data.videos[videoIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json(data.videos[videoIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 },
    );
  }
}

// DELETE - Delete video
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const videoIndex = data.videos.findIndex((v: any) => v.id === id);
    if (videoIndex === -1) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    data.videos.splice(videoIndex, 1);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 },
    );
  }
}

// GET - Get single video
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const video = data.videos.find((v: any) => v.id === id);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get video' }, { status: 500 });
  }
}
