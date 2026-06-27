import { NextRequest, NextResponse } from 'next/server';

import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { mongo } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = mongo.db();

    const images = await db.collection('images').find({}).toArray();

    return NextResponse.json(images, { status: 200 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 

    const db = mongo.db();

    const result = await db.collection('images').insertOne(body);

    return NextResponse.json({ message: "URL saved successfully!", result }, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}