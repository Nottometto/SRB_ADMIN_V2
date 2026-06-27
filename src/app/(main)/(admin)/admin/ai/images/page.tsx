import ImageGrid from './imageGrid'; 
import { mongo } from '@/lib/mongodb';

// 1. The shape of the clean data going to your frontend
interface ImageData {
  _id: string;
  url: string;
  sourceTopic: string;
  receivedAt: string;
}

// 2. NEW: The shape of the raw data coming from MongoDB
interface RawImageDocument {
  _id?: { toString: () => string }; // Accurately represents MongoDB's ObjectId
  url?: string;
  s3Url?: string;
  sourceTopic?: string;
  receivedAt?: string;
}

// 3. Updated mapping function using the strict raw type
function mapRawImages(rawImages: RawImageDocument[]): ImageData[] {
  return rawImages.map((img) => ({
    _id: img._id ? img._id.toString() : "",
    url: img.url || img.s3Url || "", 
    sourceTopic: img.sourceTopic || 'Unknown Topic',
    receivedAt: img.receivedAt || new Date().toISOString()
  }));
}

export default async function ImagesPage() {
  // 4. Replaced `any[]` with `RawImageDocument[]`
  let rawImages: RawImageDocument[] = [];
  let isError = false;
  let errorMessage = "";

  try {
    const db = mongo.db();
    
    // We cast the result to our new type so TypeScript stops complaining
    rawImages = (await db.collection('images')
      .find({})
      .sort({ receivedAt: -1 })
      .toArray()) as unknown as RawImageDocument[];
      
  } catch (error: unknown) {
    isError = true;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    console.error("Database Fetch Error:", errorMessage);
  }

  if (isError) {
    return (
      <div className="text-red-500 p-6">
        An error occurred while fetching images directly from the database. Check your terminal for details.
      </div>
    );
  }

  const images: ImageData[] = mapRawImages(rawImages);

  // 5. Added Tailwind height and overflow-y-auto classes for scrolling
  return (
    <div className="p-6 h-full max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Hardware Captures</h1>
      <ImageGrid images={images} />
    </div>
  );
}