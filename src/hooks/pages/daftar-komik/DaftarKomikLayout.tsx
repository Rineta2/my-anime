"use client"
import React, { useEffect, useState, useCallback } from 'react';

import axios from 'axios';

import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

import Pagination from '@/base/helper/Pagination';

import SearchBar from '@/hooks/pages/daftar-komik/ui/SearchBar';

import MangaCard from './ui/MangaCard';

import DaftarKomikSkeleton from './DaftarKomikkelaton';

interface MangaData {
  title: string;
  description: string;
  latest_chapter: string;
  thumbnail: string;
  param: string;
  detail_url: string;
}

interface ApiResponse {
  next_page: string | null;
  prev_page: string | null;
  data: MangaData[];
}

export default function DaftarKomikLayout() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [mangaList, setMangaList] = useState<MangaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('s') || '');
  const [inputValue, setInputValue] = useState(searchParams.get('s') || '');
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Cache for storing fetched manga data
  const [mangaCache, setMangaCache] = useState<Record<string, MangaData[]>>({});

  const fetchManga = useCallback(async (page: number, query: string) => {
    try {
      setLoading(true);
      const cacheKey = `${query}-${page}`;

      // Check cache first
      if (mangaCache[cacheKey]) {
        setMangaList(mangaCache[cacheKey]);
        setLoading(false);
        return;
      }

      const apiUrl = query
        ? `/api/komiku?s=${encodeURIComponent(query)}&page=${page}`
        : `/api/komiku?page=${page}&tag=hot`;

      const response = await axios.get(apiUrl, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY_KOMIKU
        }
      });
      const data: ApiResponse = response.data;

      // Update cache
      setMangaCache(prev => ({
        ...prev,
        [cacheKey]: data.data
      }));

      setMangaList(data.data);
      setTotalPages(page + (data.next_page ? 1 : 0));
    } catch (error) {
      console.error('Error fetching manga:', error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [mangaCache]);

  useEffect(() => {
    fetchManga(currentPage, searchQuery);

    // Prefetch next page
    if (currentPage < totalPages) {
      fetchManga(currentPage + 1, searchQuery);
    }
  }, [currentPage, searchQuery, fetchManga, totalPages]);

  const handleSearchSubmit = (value: string) => {
    setSearchQuery(value);

    // Update URL with search query
    const params = new URLSearchParams(window.location.search);
    params.set('page', '1'); // Reset to first page when searching
    params.set('s', value);

    window.location.href = `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());

    // Preserve search query if it exists
    if (searchQuery) {
      params.set('s', searchQuery);
    }

    window.location.href = `?${params.toString()}`;
  };

  if (isInitialLoad) {
    return <DaftarKomikSkeleton />;
  }

  return (
    <section className='min-h-screen py-20'>
      <div className="container px-4 md:px-8">
        <div className="flex flex-col space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="breadcrumbs text-sm md:text-base">
              <ul className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <span className="inline-flex items-center gap-2 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Manga
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2 text-sm md:text-base bg-card-bg/80 backdrop-blur-md px-4 py-2 rounded-full border border-card-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-medium">Halaman {currentPage} dari {totalPages}</span>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar
                  searchQuery={inputValue}
                  onSearchChange={setInputValue}
                  onSearchSubmit={handleSearchSubmit}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5 mt-5 sm:mt-6 md:mt-8">
          {loading ? (
            <>
              {mangaList.map((manga, index) => (
                <MangaCard key={index} manga={manga} index={index} />
              ))}
              {[...Array(5)].map((_, index) => (
                <div key={`loading-${index}`} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </>
          ) : (
            mangaList.map((manga, index) => (
              <MangaCard key={index} manga={manga} index={index} />
            ))
          )}
        </div>

        <div className="flex justify-center mt-12 animate-fadeIn">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}