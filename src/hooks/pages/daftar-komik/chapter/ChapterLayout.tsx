"use client";

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default function ChapterPage({ params }: { params: Promise<{ param: string }> }) {
  const resolvedParams = use(params);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/komiku/chapter/${resolvedParams.param}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
        });
        setImages(response.data.data);
      } catch (error) {
        console.error('Error fetching chapter images:', error);
        setError('Failed to load chapter images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterImages();
  }, [resolvedParams.param]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
          <Link
            href="/komik"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Manga List
          </Link>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">No images found</h1>
          <Link
            href="/komik"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Manga List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className='min-h-screen py-24 sm:py-28'>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8 bg-[var(--card-bg)] p-4 border-[var(--border-color)] rounded-lg shadow-sm sticky top-4 z-10">
          <Link
            href="/komik"
            className="inline-flex items-center transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Manga List
          </Link>
          <div className="text-sm font-medium bg-[var(--card-bg)] px-4 py-2 border-[var(--border-color)] border rounded-full">
            Total Pages: {images.length}
          </div>
        </div>

        <div className="flex flex-col items-center">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative w-full max-w-4xl"
            >
              <Image
                src={imageUrl}
                alt={`Page ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority={index < 3}
              />
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                Chapter {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 