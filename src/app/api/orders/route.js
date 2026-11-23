import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { orders as initialOrders } from '@/data/orders';

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json({ success: true, orders: initialOrders, source: 'mock' });
    }

    const client = await clientPromise;
    const db = client.db('shipflux');
    const collection = db.collection('orders');

    let orders = await collection.find({}).sort({ _id: -1 }).toArray();

    if (!orders || orders.length === 0) {
      const sanitized = initialOrders.map(({ _id, ...rest }) => rest);
      await collection.insertMany(sanitized);
      orders = await collection.find({}).sort({ _id: -1 }).toArray();
    }

    return NextResponse.json({ success: true, orders, source: 'mongodb' });
  } catch (error) {
    console.error('Error fetching orders from MongoDB:', error);
    return NextResponse.json({ success: false, orders: initialOrders, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = body.orderId || `SN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      ...body,
      orderId,
      createdAt: new Date().toISOString()
    };

    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db('shipflux');
      await db.collection('orders').insertOne(newOrder);
    }

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Error creating order in MongoDB:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { orderId, newStatus, trackingTimeline } = body;

    if (!orderId || !newStatus) {
      return NextResponse.json({ success: false, message: 'orderId and newStatus are required' }, { status: 400 });
    }

    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db('shipflux');
      await db.collection('orders').updateOne(
        { orderId },
        { 
          $set: { 
            status: newStatus, 
            ...(trackingTimeline ? { trackingTimeline } : {}),
            updatedAt: new Date().toISOString() 
          } 
        }
      );
    }

    return NextResponse.json({ success: true, orderId, status: newStatus });
  } catch (error) {
    console.error('Error updating order status in MongoDB:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
