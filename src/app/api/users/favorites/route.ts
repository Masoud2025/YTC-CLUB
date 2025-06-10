/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define interfaces for type safety
interface User {
  id: string;
  favoriteJobs: string[];
  name?: string;
  email?: string;
  isPremium?: boolean;
  isPlus?: boolean;
  createdAt?: string;
}

interface UsersData {
  users: User[];
}

const usersDataPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { userId, jobId, action } = await request.json();

    // Read users data with proper typing
    let usersData: UsersData = { users: [] };
    try {
      const fileContents = fs.readFileSync(usersDataPath, 'utf8');
      usersData = JSON.parse(fileContents) as UsersData;
    } catch (error) {
      // File doesn't exist, create new structure
      console.log('Creating new users data file');
    }

    // Ensure users array exists
    if (!usersData.users) {
      usersData.users = [];
    }

    // Find or create user
    let userIndex = usersData.users.findIndex((u: User) => u.id === userId);
    if (userIndex === -1) {
      const newUser: User = {
        id: userId,
        favoriteJobs: [],
      };
      usersData.users.push(newUser);
      userIndex = usersData.users.length - 1;
    }

    // Update favorites
    const user = usersData.users[userIndex];
    if (!user.favoriteJobs) {
      user.favoriteJobs = [];
    }

    if (action === 'add') {
      if (!user.favoriteJobs.includes(jobId)) {
        user.favoriteJobs.push(jobId);
      }
    } else if (action === 'remove') {
      user.favoriteJobs = user.favoriteJobs.filter(
        (id: string) => id !== jobId,
      );
    }

    // Ensure directory exists
    const dataDir = path.dirname(usersDataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(usersDataPath, JSON.stringify(usersData, null, 2));
    return NextResponse.json({ message: 'Favorites updated successfully' });
  } catch (error) {
    console.error('Error updating favorites:', error);
    return NextResponse.json(
      { error: 'Failed to update favorites' },
      { status: 500 },
    );
  }
}
