"use client"

import React, { useState, useMemo } from 'react'

import axios from 'axios'

import { useQuery } from '@tanstack/react-query'

import { useSearchParams } from 'next/navigation'

import Pagination from '@/base/helper/Pagination'

import SearchBar from '@/hooks/pages/anime-terbaru/ui/SearchBar'

import AnimeCard from '@/hooks/pages/anime-terbaru/ui/AnimeCard'

import PageHeader from '@/hooks/pages/anime-terbaru/ui/PageHeader'

import AnimeTerbaruSkeleton from '@/hooks/pages/anime-terbaru/AnimeTerbaruSkelaton'

import { ApiResponse } from '@/hooks/pages/types/AnimeTerbaru'

export default function AnimeTerbaruLayout() {
    const searchParams = useSearchParams()
    const pageParam = searchParams.get('page')
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1
    const [searchQuery, setSearchQuery] = useState('')

    const { data, isLoading } = useQuery<ApiResponse>({
        queryKey: ['anime-recent', currentPage],
        queryFn: async () => {
            const baseUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '')
            const apiUrl = `${baseUrl}/api/anime/recent`

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
        if (!searchQuery) return animeList
        return animeList.filter(anime =>
            anime.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [data?.data.animeList, searchQuery])

    if (isLoading) return <AnimeTerbaruSkeleton />

    const handlePageChange = (page: number) => {
        window.location.href = `?page=${page}`
    }

    return (
        <section className='min-h-screen py-8 sm:py-12'>
            <div className="container px-4 md:px-10 space-y-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <PageHeader
                        title="Anime Terbaru"
                    />

                    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex items-center space-x-2 text-sm md:text-base bg-card-bg/50 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-card-border animate-fadeIn whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span>Halaman {pagination.currentPage} dari {pagination.totalPages}</span>
                        </div>
                        <div className="w-full sm:w-auto">
                            <SearchBar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAnimeList.map((anime, index) => (
                        <AnimeCard
                            key={`${anime.animeId}-${anime.episodes}-${index}`}
                            anime={anime}
                            index={index}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 animate-fadeIn">
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

