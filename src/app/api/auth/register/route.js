import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { users as initialUsers } from '@/data/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const newUserId = `user-${Date.now()}`;
    const newUser = {
      id: newUserId,
      name: (name && name.trim()) || 'Shipflux Customer',
      email: cleanEmail,
      password,
      phone: phone || '+91 98000 00000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      role: 'customer',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      addresses: [],
      createdAt: new Date().toISOString()
    };

    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('shipflux');
        const collection = db.collection('users');

        // Check if user already exists
        const existing = await collection.findOne({ email: cleanEmail });
        if (existing) {
          return NextResponse.json(
            { success: false, message: 'An account with this email address already exists. Please sign in instead.' },
            { status: 400 }
          );
        }

        await collection.insertOne(newUser);
      } catch (dbErr) {
        console.warn('MongoDB register fallback:', dbErr);
      }
    }

    const token = `sf_user_${Buffer.from(`${cleanEmail}:${Date.now()}`).toString('base64')}`;
    const { password: _, _id, ...safeUser } = newUser;

    return NextResponse.json({
      success: true,
      token,
      user: safeUser,
      message: 'Account created successfully. Welcome to Shipflux!'
    });
  } catch (error) {
    console.error('Error in user registration:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}
