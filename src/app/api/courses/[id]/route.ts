/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper functions
function readCoursesData() {
  const coursesPath = path.join(process.cwd(), 'data', 'courses.json');
  try {
    const data = fs.readFileSync(coursesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { courses: [] };
  }
}

function writeCoursesData(data: any) {
  const coursesPath = path.join(process.cwd(), 'data', 'courses.json');
  fs.writeFileSync(coursesPath, JSON.stringify(data, null, 2));
}

// GET - Read single course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Changed this line
  try {
    const { id } = await params; // Added await here
    const data = readCoursesData();
    const course = data.courses.find((c: any) => c.id === id);

    if (!course) {
      return NextResponse.json({ error: 'دوره یافت نشد' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error reading course:', error);
    return NextResponse.json({ error: 'خطا در خواندن دوره' }, { status: 500 });
  }
}

// PUT - Update course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Changed this line
  try {
    const { id } = await params; // Added await here
    const body = await request.json();
    const data = readCoursesData();

    const courseIndex = data.courses.findIndex((c: any) => c.id === id);

    if (courseIndex === -1) {
      return NextResponse.json({ error: 'دوره یافت نشد' }, { status: 404 });
    }

    // Update course
    data.courses[courseIndex] = {
      ...data.courses[courseIndex],
      ...body,
      id: id, // Keep original ID
      updatedAt: new Date().toISOString(),
    };

    writeCoursesData(data);

    return NextResponse.json(data.courses[courseIndex]);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'خطا در به‌روزرسانی دوره' },
      { status: 500 },
    );
  }
}

// DELETE - Delete course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Changed this line
  try {
    const { id } = await params; // Added await here
    const data = readCoursesData();
    const courseIndex = data.courses.findIndex((c: any) => c.id === id);

    if (courseIndex === -1) {
      return NextResponse.json({ error: 'دوره یافت نشد' }, { status: 404 });
    }

    // Remove course
    const deletedCourse = data.courses.splice(courseIndex, 1)[0];
    writeCoursesData(data);

    return NextResponse.json({
      message: 'دوره با موفقیت حذف شد',
      deletedCourse,
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'خطا در حذف دوره' }, { status: 500 });
  }
}
