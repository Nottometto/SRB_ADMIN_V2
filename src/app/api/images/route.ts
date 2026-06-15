import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
  try {
    await client.connect();
    const db = client.db();

    // Fetch data from a specific collection (e.g., 'users')
    const users = await db.collection('users').find({}).toArray();

    // Return the data as a JSON response
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Grab the data you sent in the body of your request
    const body = await req.json(); 

    // 2. Connect to the database
    await client.connect();
    const db = client.db();

    // 3. Insert the data into your collection (using 'images' or 'users')
    const result = await db.collection('users').insertOne(body);

    // 4. Return a success response
    return NextResponse.json({ message: "Data saved successfully!", result }, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}