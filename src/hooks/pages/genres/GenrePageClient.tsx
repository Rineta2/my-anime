'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import Pagination from '@/base/helper/Pagination'

import { GenrePageClientProps } from '@/hooks/pages/types/Genre'

import GenreHeader from '@/hooks/pages/genres/genres/GenreHeader'

import GenreGrid from '@/hooks/pages/genres/genres/GenreGrid'

export default function GenrePageClient({
    genres,
    animeList,
    currentPage,
    totalPages
}: GenrePageClientProps) {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        router.push(`/genres/${genres}?page=${newPage}`);
    };

    return (
        <section className='min-h-screen py-24 bg-[var(--background)]'>
            <div className="container mx-auto px-4 sm:px-6">
                <GenreHeader genre={genres} />
                <GenreGrid animeList={animeList} />

                {/* Pagination */}
                <div className="mt-12 md:mt-16">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
} 