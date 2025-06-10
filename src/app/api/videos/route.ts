/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'videos.json');

// GET - Read videos
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ videos: [], categories: [] }, { status: 500 });
  }
}

// POST - Create new video
export async function POST(request: Request) {
  try {
    const newVideo = await request.json();
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const maxId = Math.max(...data.videos.map((v: any) => v.id), 0);
    newVideo.id = maxId + 1;
    newVideo.createdAt = new Date().toISOString();
    newVideo.updatedAt = new Date().toISOString();

    data.videos.push(newVideo);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 },
    );
  }
}
