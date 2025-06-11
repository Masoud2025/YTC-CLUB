/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'jobs.json');

// POST - Increment view count
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // Changed this line
  try {
    const { id } = await params; // Added await here

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const jobIndex = data.jobs.findIndex((j: any) => j.id === id);
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    data.jobs[jobIndex].views = (data.jobs[jobIndex].views || 0) + 1;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ views: data.jobs[jobIndex].views });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update views' },
      { status: 500 },
    );
  }
}
