"use client";

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ChapterPage({ params }: { params: Promise<{ param: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chapterInfo, setChapterInfo] = useState<{
    mangaParam: string;
    chapterNumber: number;
    totalChapters: number;
    prevChapter: string | null;
    nextChapter: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/komiku/chapter/${resolvedParams.param}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY_KOMIKU
          }
        });
        setImages(response.data.data);

        // Extract manga param from the chapter param
        // Assuming chapter param format is "manga-slug-chapter-number"
        const paramParts = resolvedParams.param.split('-');
        if (paramParts.length >= 2) {
          // Remove the last part (chapter number) to get manga slug
          const mangaSlug = paramParts.slice(0, -1).join('-');

          // Try to get chapter number from the last part
          const chapterNumber = parseInt(paramParts[paramParts.length - 1], 10) || 1;

          // Format chapter numbers with leading zeros
          const formatChapterNumber = (num: number) => {
            return num.toString().padStart(2, '0');
          };

          // Set basic chapter info without making an additional API call
          setChapterInfo({
            mangaParam: mangaSlug,
            chapterNumber: chapterNumber,
            totalChapters: 0, // We don't know the total without the API
            prevChapter: chapterNumber > 1 ? `${mangaSlug}-${formatChapterNumber(chapterNumber - 1)}` : null,
            nextChapter: `${mangaSlug}-${formatChapterNumber(chapterNumber + 1)}` // We'll assume there's a next chapter
          });
        }
      } catch (error) {
        console.error('Error fetching chapter images:', error);
        setError('Failed to load chapter images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterImages();
  }, [resolvedParams.param]);

  const navigateToChapter = (chapterParam: string | null | undefined) => {
    if (chapterParam) {
      router.push(`/daftar-manga/chapter/${chapterParam}`);
    }
  };

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
            href="/daftar-manga"
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
            href="/daftar-manga"
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
    <section className='min-h-screen py-20 sm:py-28'>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-lg backdrop-blur-sm sticky top-4 z-10 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <Link
              href={`/daftar-manga/${chapterInfo?.mangaParam || ''}`}
              className="inline-flex items-center text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Manga
            </Link>
          </div>

          <div className='flex items-center gap-4 sm:gap-6'>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Chapter {chapterInfo?.chapterNumber ? chapterInfo.chapterNumber.toString().padStart(2, '0') : ''}
              </span>
            </div>

            <div className="text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full">
              {images.length} Pages
            </div>
          </div>
        </div>

        {/* Manga Pages */}
        <div className="flex flex-col items-center">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative w-full max-w-4xl group"
            >
              <div>
                <Image
                  src={imageUrl}
                  alt={`Page ${index + 1}`}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority={index < 3}
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Page {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-10 px-4">
          <button
            onClick={() => navigateToChapter(chapterInfo?.prevChapter)}
            disabled={!chapterInfo?.prevChapter}
            className={`p-3 rounded-full shadow-lg transition-all duration-200 ${chapterInfo?.prevChapter
              ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigateToChapter(chapterInfo?.nextChapter)}
            disabled={!chapterInfo?.nextChapter}
            className={`p-3 rounded-full shadow-lg transition-all duration-200 ${chapterInfo?.nextChapter
              ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
} 