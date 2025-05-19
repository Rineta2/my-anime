"use client"

import SectionHeader from '@/components/ui/home/ui/SectionHeader'
import AnimeCard from '@/components/ui/home/ui/AnimeCard'
import React, { useState } from 'react'
import { HomeResponse } from '@/components/ui/home/types/home';
import Pagination from '@/base/helper/Pagination';
import Sidebar from '@/components/ui/sidebar/Sidebar';

interface AnimeContentProps {
  animeData: HomeResponse;
}

export default function AnimeContent({ animeData }: AnimeContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = animeData?.data.recent.animeList.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimeList = animeData?.data.recent.animeList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="min-h-screen py-8">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-20 md:space-y-24">
          <div className='flex gap-8 flex-col xl:flex-row'>
            <div className='w-full xl:w-3/4 space-y-8'>
              <SectionHeader />
              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {currentAnimeList?.map((anime, index) => (
                  <AnimeCard key={`${anime.animeId}-${index}`} anime={anime} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Page {currentPage} of {totalPages}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            <Sidebar animeData={animeData} />
          </div>
        </div>
      </div>
    </section>
  )
}