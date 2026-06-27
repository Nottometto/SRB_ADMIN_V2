"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ImageData {
  _id: string;
  url: string;
  sourceTopic: string;
  receivedAt: string;
}

// Added a fallback `images = []` to prevent it from ever being undefined again
export default function ImageGrid({ images = [] }: { images: ImageData[] }) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  if (images.length === 0) {
    return <p className="text-gray-500 mt-4">No images found in the database.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => {
          if (!img.url) return null;

          return (
            <div 
              key={img._id} 
              className="border rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-105 hover:shadow-md"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative w-full h-48 bg-gray-100">
                <Image 
                  src={img.url} 
                  alt="Hardware capture preview"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-xs text-gray-500 font-mono truncate">
                  {img.sourceTopic || 'Unknown Topic'}
                </p>
                <p className="text-sm text-gray-800 mt-1">
                  {img.receivedAt ? new Date(img.receivedAt).toLocaleString() : 'Unknown Date'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedImage(null)} 
          />
          <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {new Date(selectedImage.receivedAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  {selectedImage.sourceTopic}
                </p>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full h-[60vh] md:h-[75vh] bg-gray-900">
              <Image 
                src={selectedImage.url} 
                alt="Hardware capture full size"
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
                priority 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}