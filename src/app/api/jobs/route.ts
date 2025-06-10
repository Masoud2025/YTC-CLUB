/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'jobs.json');

// GET - Read jobs
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ jobs: [], categories: [] }, { status: 500 });
  }
}

// POST - Create new job
export async function POST(request: Request) {
  try {
    const newJob = await request.json();
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const maxId = Math.max(...data.jobs.map((j: any) => parseInt(j.id)), 0);
    newJob.id = (maxId + 1).toString();
    newJob.createdAt = new Date().toISOString();
    newJob.updatedAt = new Date().toISOString();
    newJob.postedDate = new Date().toISOString();
    newJob.expiryDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toISOString(); // 30 days
    newJob.views = 0;
    newJob.applications = 0;
    newJob.isPublished = false; // Requires admin approval
    newJob.rejectionReason = null;

    // Add to pending jobs for admin review
    if (!data.pendingJobs) data.pendingJobs = [];
    data.pendingJobs.push(newJob);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 },
    );
  }
}
