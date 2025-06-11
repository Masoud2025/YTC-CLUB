/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'jobs.json');

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // Changed this line
  try {
    const { id: jobId } = await params; // Added await here
    const { reason } = await request.json();

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    // Find job in pending jobs
    const pendingJobIndex = data.pendingJobs.findIndex(
      (j: any) => j.id === jobId,
    );
    if (pendingJobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Update job with rejection reason and remove from pending
    const job = data.pendingJobs[pendingJobIndex];
    job.isPublished = false;
    job.rejectionReason = reason;
    job.updatedAt = new Date().toISOString();

    // Add to rejected jobs array (for user notification)
    if (!data.rejectedJobs) data.rejectedJobs = [];
    data.rejectedJobs.push(job);

    // Remove from pending
    data.pendingJobs.splice(pendingJobIndex, 1);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'Job rejected successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reject job' },
      { status: 500 },
    );
  }
}
