/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'jobs.json');

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const jobId = params.id;

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    // Find job in pending jobs
    const pendingJobIndex = data.pendingJobs.findIndex(
      (j: any) => j.id === jobId,
    );
    if (pendingJobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Move job from pending to published
    const job = data.pendingJobs[pendingJobIndex];
    job.isPublished = true;
    job.isActive = true;
    job.postedDate = new Date().toISOString();
    job.updatedAt = new Date().toISOString();

    // Add to jobs array and remove from pending
    data.jobs.push(job);
    data.pendingJobs.splice(pendingJobIndex, 1);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'Job approved successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to approve job' },
      { status: 500 },
    );
  }
}
