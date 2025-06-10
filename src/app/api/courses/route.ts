/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to read courses data
function readCoursesData() {
  const coursesPath = path.join(process.cwd(), 'data', 'courses.json');
  try {
    const data = fs.readFileSync(coursesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with empty structure
    const initialData = { courses: [] };
    fs.mkdirSync(path.dirname(coursesPath), { recursive: true });
    fs.writeFileSync(coursesPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

// Helper function to write courses data
function writeCoursesData(data: any) {
  const coursesPath = path.join(process.cwd(), 'data', 'courses.json');
  fs.writeFileSync(coursesPath, JSON.stringify(data, null, 2));
}

// GET - Read all courses
export async function GET() {
  try {
    const data = readCoursesData();
    return NextResponse.json(data.courses);
  } catch (error) {
    console.error('Error reading courses:', error);
    return NextResponse.json({ error: 'خطا در خواندن پک‌ها' }, { status: 500 });
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, category, downloadLinks } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'اطلاعات ناقص است' }, { status: 400 });
    }

    const data = readCoursesData();

    // Generate unique ID and slug
    const newId = `course_${Date.now()}`;
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const newCourse = {
      id: newId,
      title,
      description,
      image: image || '/footbaly.jpg',
      slug: `${slug}-${Date.now()}`,
      downloadLinks: downloadLinks || [],
      isActive: true,
      category: category || 'عمومی',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.courses.push(newCourse);
    writeCoursesData(data);

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'خطا در ایجاد پک' }, { status: 500 });
  }
}
