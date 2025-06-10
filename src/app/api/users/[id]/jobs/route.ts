import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  createdBy: string;
  isPublished: boolean;
  isActive: boolean;
  views: number;
  applications: number;
  createdAt: string;
  updatedAt: string;
}

interface JobsData {
  jobs: Job[];
  pendingJobs: Job[];
}

const dataPath = path.join(process.cwd(), 'data', 'jobs.json');

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data: JobsData = JSON.parse(fileContents);

    // Get published jobs by user
    const publishedJobs =
      data.jobs?.filter((job: Job) => job.createdBy === userId) || [];

    // Get pending jobs by user
    const pendingJobs =
      data.pendingJobs?.filter((job: Job) => job.createdBy === userId) || [];

    // Combine all user jobs
    const allUserJobs = [...publishedJobs, ...pendingJobs];

    return NextResponse.json({ jobs: allUserJobs });
  } catch (error) {
    console.error('Error loading user jobs:', error);
    return NextResponse.json({ jobs: [] }, { status: 500 });
  }
}
