import React from 'react'

import { AnimeResponse } from '@/components/ui/home/types/home'

import SectionHeader from '@/components/ui/home/ui/anime/SectionHeader'

import AnimeCard from '@/components/ui/home/ui/anime/AnimeCard'

export default function AnimeTerbaru({ data }: { data: AnimeResponse }) {
  return (
    <div className='flex flex-col space-y-6 md:space-y-10'>
      <SectionHeader title="Anime Terbaru" href={data?.data.recent.href} />
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
        {data?.data.recent.animeList.map((anime, index) => (
          <AnimeCard key={`${anime.animeId}-${index}`} anime={anime} index={index} />
        ))}
      </div>
    </div>
  )
}