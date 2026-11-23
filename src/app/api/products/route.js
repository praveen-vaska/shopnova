import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { products as initialProducts } from '@/data/products';

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json({ success: true, products: initialProducts, source: 'mock' });
    }

    const client = await clientPromise;
    const db = client.db('shipflux');
    const collection = db.collection('products');

    let products = await collection.find({}).sort({ _id: -1 }).toArray();

    // Auto-seed if the collection is newly created / empty
    if (!products || products.length === 0) {
      const sanitized = initialProducts.map(({ _id, ...rest }) => rest);
      await collection.insertMany(sanitized);
      products = await collection.find({}).sort({ _id: -1 }).toArray();
    }

    return NextResponse.json({ success: true, products, source: 'mongodb' });
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    return NextResponse.json({ success: false, products: initialProducts, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.name || !body.price) {
      return NextResponse.json({ success: false, message: 'Name and price are required' }, { status: 400 });
    }

    const id = body.id || `prod-${Date.now()}`;
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = {
      ...body,
      id,
      slug,
      createdAt: new Date().toISOString()
    };

    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db('shipflux');
      await db.collection('products').insertOne(newProduct);
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error creating product in MongoDB:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedFields } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
    }

    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db('shipflux');
      await db.collection('products').updateOne(
        { id },
        { $set: { ...updatedFields, updatedAt: new Date().toISOString() } }
      );
    }

    return NextResponse.json({ success: true, id, updatedFields });
  } catch (error) {
    console.error('Error updating product in MongoDB:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
    }

    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db('shipflux');
      await db.collection('products').deleteOne({ id });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error deleting product in MongoDB:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
