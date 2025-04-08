"use client";

import React, { useEffect, useState, use } from 'react';

import axios from 'axios';

import Image from 'next/image';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { MangaDetail } from './types/mangaDetails';

export default function MangaDetailPage({ params }: { params: Promise<{ param: string }> }) {
  const resolvedParams = use(params);
  const [mangaDetail, setMangaDetail] = useState<MangaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/komiku/${resolvedParams.param}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
        });
        setMangaDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetail();
  }, [resolvedParams.param]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!mangaDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Manga not found</h1>
          <Link href="/komik" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to Manga List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className='min-h-screen py-14 sm:py-20'>
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
        {/* Hero Section with Parallax Effect */}
        <div className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={mangaDetail.thumbnail}
              alt={`${mangaDetail.title} background`}
              fill
              className="object-cover object-center filter blur-sm brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-4 sm:pb-6 md:pb-8 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 sm:gap-6 w-full">
              {/* Manga Cover */}
              <motion.div
                className="w-24 sm:w-32 md:w-40 lg:w-48 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative h-[100px] sm:h-[150px] md:h-[200px] lg:h-[250px] rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 hover:border-primary/60 transform hover:scale-[1.02] transition-all duration-300">
                  <Image
                    src={mangaDetail.thumbnail}
                    alt={`${mangaDetail.title} cover`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </motion.div>

              {/* Title Section */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight drop-shadow-lg">
                  {mangaDetail.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 md:mt-4">
                  {mangaDetail.genre.map((genre, index) => (
                    <span key={index} className="px-2 sm:px-3 py-1 bg-primary/70 rounded-full text-[10px] sm:text-xs">
                      {genre}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8 md:space-y-10">
              {/* Synopsis */}
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Synopsis</h2>
                <p className='text-[var(--text-color)] text-sm sm:text-base'>{mangaDetail.synopsis}</p>
              </div>

              {/* Chapters */}
              {mangaDetail.chapters && mangaDetail.chapters.length > 0 ? (
                <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg border border-[var(--border-color)]">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Chapters</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {mangaDetail.chapters.map((chapter, index) => (
                      <Link
                        key={index}
                        href={`/daftar-komik/chapter/${chapter.param}`}
                        className="block p-3 sm:p-4 bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/80 border border-[var(--border-color)] rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="relative">
                          <div className="font-semibold mb-1 sm:mb-2 text-[var(--text-color)] text-sm sm:text-base">{chapter.chapter}</div>
                          <div className="text-[10px] sm:text-xs text-[var(--text-color)]/20">{chapter.release}</div>
                          <div className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full px-2 py-1">
                            {index + 1}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg text-center">
                  <p className="text-[var(--text-color)]/20 text-sm sm:text-base">No chapters available yet</p>
                </div>
              )}

              {/* Similar Manga */}
              {mangaDetail.similars && mangaDetail.similars.length > 0 && (
                <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg border border-[var(--border-color)]">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Similar Manga</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {mangaDetail.similars.map((manga, index) => (
                      <Link href={`/daftar-komik/${manga.param}`} key={index} className="group">
                        <div className="bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-[var(--border-color)]">
                          <div className="relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px]">
                            <Image
                              src={manga.thumbnail}
                              alt={manga.title}
                              fill
                              className="object-cover"
                              priority
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            />
                          </div>
                          <div className="p-2 sm:p-3 md:p-4">
                            <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2 text-[var(--text-color)]">{manga.title}</h3>
                            <p className="text-[10px] sm:text-xs text-[var(--text-color)]/20 line-clamp-2">{manga.synopsis}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:relative mt-6 lg:mt-0 hidden lg:block">
              <div className="lg:sticky lg:top-24 space-y-6 sm:space-y-8">
                {/* Manga Cover */}
                <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-[var(--border-color)]">
                  <div className="relative h-[300px] sm:h-[350px] md:h-[400px]">
                    <Image
                      src={mangaDetail.thumbnail}
                      alt={mangaDetail.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-color)]">{mangaDetail.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {mangaDetail.genre.map((genre, index) => (
                        <span key={index} className="px-2 sm:px-3 py-1 bg-primary/70 text-[var(--text-color)] rounded-full text-[10px] sm:text-xs">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/daftar-komik"
                      className="inline-block w-full text-center py-2 bg-primary hover:bg-primary/80 text-white rounded-md transition-colors text-sm sm:text-base"
                    >
                      Back to Manga List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 