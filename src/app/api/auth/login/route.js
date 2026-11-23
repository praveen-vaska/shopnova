import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { users as initialUsers } from '@/data/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    let foundUser = null;

    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('shipflux');
        const collection = db.collection('users');

        // Auto-seed initial users if empty
        if ((await collection.countDocuments()) === 0) {
          const seeded = initialUsers.map((u) => ({
            ...u,
            password: 'password123',
            createdAt: new Date().toISOString()
          }));
          await collection.insertMany(seeded);
        }

        foundUser = await collection.findOne({ email: cleanEmail });
      } catch (dbErr) {
        console.warn('MongoDB login fallback to seed data:', dbErr);
      }
    }

    // Fallback to initialUsers data if DB search didn't find or errored
    if (!foundUser) {
      const match = initialUsers.find((u) => u.email.toLowerCase() === cleanEmail);
      if (match) {
        foundUser = { ...match, password: 'password123' };
      }
    }

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: 'No account found with this email. Please check your spelling or register.' },
        { status: 401 }
      );
    }

    // Check password
    if (foundUser.password && foundUser.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password. Please verify and try again.' },
        { status: 401 }
      );
    }

    const token = `sf_user_${Buffer.from(`${cleanEmail}:${Date.now()}`).toString('base64')}`;
    const { password: _, _id, ...safeUser } = foundUser;

    return NextResponse.json({
      success: true,
      token,
      user: safeUser,
      message: `Welcome back, ${safeUser.name}!`
    });
  } catch (error) {
    console.error('Error in customer login:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during login.' },
      { status: 500 }
    );
  }
}
