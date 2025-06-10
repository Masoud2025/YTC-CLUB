/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'jobs.json');

// PUT - Update job
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const updatedData = await request.json();

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const jobIndex = data.jobs.findIndex((j: any) => j.id === id);
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    data.jobs[jobIndex] = {
      ...data.jobs[jobIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json(data.jobs[jobIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 },
    );
  }
}

// DELETE - Delete job
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const jobIndex = data.jobs.findIndex((j: any) => j.id === id);
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    data.jobs.splice(jobIndex, 1);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 },
    );
  }
}
