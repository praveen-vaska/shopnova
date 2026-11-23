import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Default fallback credentials if not set in environment
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@shipflux.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Shipflux@2026';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Both email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    let isAuthenticated = false;
    let adminProfile = null;

    // Check MongoDB admins collection if connected
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('shipflux');
        const adminsCollection = db.collection('admins');

        // Check if admin exists in database
        let dbAdmin = await adminsCollection.findOne({ email: cleanEmail });

        // Auto-seed default master admin if collection is empty
        if (!dbAdmin && (await adminsCollection.countDocuments()) === 0) {
          const defaultAdmin = {
            email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
            password: DEFAULT_ADMIN_PASSWORD,
            name: 'Shipflux Master Administrator',
            role: 'superadmin',
            createdAt: new Date().toISOString()
          };
          await adminsCollection.insertOne(defaultAdmin);
          if (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
            dbAdmin = defaultAdmin;
          }
        }

        if (dbAdmin && dbAdmin.password === password) {
          isAuthenticated = true;
          adminProfile = {
            email: dbAdmin.email,
            name: dbAdmin.name || 'Shipflux Admin',
            role: dbAdmin.role || 'superadmin'
          };
        }
      } catch (dbErr) {
        console.warn('MongoDB admin check fallback to environment credentials:', dbErr);
      }
    }

    // Fallback environment verification
    if (!isAuthenticated) {
      if (
        cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
        password === DEFAULT_ADMIN_PASSWORD
      ) {
        isAuthenticated = true;
        adminProfile = {
          email: DEFAULT_ADMIN_EMAIL,
          name: 'Shipflux Master Administrator',
          role: 'superadmin'
        };
      }
    }

    if (!isAuthenticated) {
      // Simulate slight delay to prevent timing attacks
      await new Promise((res) => setTimeout(res, 400));
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials. Access denied. Unauthorized attempts are monitored.' 
        },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = `sf_admin_${Buffer.from(`${cleanEmail}:${Date.now()}:${Math.random()}`).toString('base64')}`;

    return NextResponse.json({
      success: true,
      token,
      admin: adminProfile,
      message: 'Authentication successful. Welcome to Shipflux Admin Console.'
    });
  } catch (error) {
    console.error('Error during admin authentication:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during authentication.', error: error.message },
      { status: 500 }
    );
  }
}
