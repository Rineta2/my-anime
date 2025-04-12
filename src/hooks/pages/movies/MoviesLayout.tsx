"use client"

import React, { useState, useMemo } from 'react'

import axios from 'axios'

import { useQuery } from '@tanstack/react-query'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import Pagination from '@/base/helper/Pagination'

import SearchBar from '@/hooks/pages/movies/ui/SearchBar'

import AnimeCard from '@/hooks/pages/movies/ui/AnimeCard'

import AnimeTerbaruSkeleton from '@/hooks/pages/anime-terbaru/AnimeTerbaruSkelaton'

import { ApiResponse } from '@/hooks/pages/types/AnimeTerbaru'

export default function MoviesLayout() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['anime-recent', currentPage],
    queryFn: async () => {
      const baseUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '')
      const apiUrl = `${baseUrl}/api/anime/movies`

      const response = await axios.get<ApiResponse>(apiUrl, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        },
        params: {
          page: currentPage
        }
      })

      return response.data
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    placeholderData: (previousData) => previousData // Keep previous data while loading
  })

  const pagination = data?.pagination ?? {
    currentPage: 1,
    hasPrevPage: false,
    prevPage: null,
    hasNextPage: false,
    nextPage: 1,
    totalPages: 1
  }

  const filteredAnimeList = useMemo(() => {
    const animeList = data?.data.animeList ?? []
    if (!searchQuery) return animeList.map(anime => ({
      ...anime,
      type: anime.type || 'Movie',
      score: anime.score || '0',
      status: anime.status || 'Completed',
      genreList: (anime.genres || []).map(genre => ({
        ...genre,
        samehadakuUrl: genre.href
      }))
    }))
    return animeList
      .filter(anime => anime.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(anime => ({
        ...anime,
        type: anime.type || 'Movie',
        score: anime.score || '0',
        status: anime.status || 'Completed',
        genreList: (anime.genres || []).map(genre => ({
          ...genre,
          samehadakuUrl: genre.href
        }))
      }))
  }, [data?.data.animeList, searchQuery])

  if (isLoading) return <AnimeTerbaruSkeleton />

  const handlePageChange = (page: number) => {
    window.location.href = `?page=${page}`
  }

  return (
    <section className='min-h-screen py-20'>
      <div className="container px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
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
                      d="M7 4v16M17 4v16M3 8h18M3 16h18"></path>
                  </svg>
                  Movies
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2 text-sm md:text-base bg-card-bg/80 backdrop-blur-md px-4 py-2 rounded-full border border-card-border/50 shadow-sm hover:shadow-md transition-all duration-200">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-medium">Halaman {pagination.currentPage} dari {pagination.totalPages}</span>
            </div>
            <div className="w-full sm:w-auto">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {filteredAnimeList.map((anime, index) => (
            <AnimeCard
              key={`${anime.animeId}-${anime.episodes}-${index}`}
              anime={anime}
              index={index}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 animate-fadeIn">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

