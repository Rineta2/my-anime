import React from 'react'

import { AnimeResponse } from '@/components/ui/home/types/home'

import AnimeMovieCard from '@/components/ui/home/ui/movie/AnimeMovieCard'

import SectionTitle from '@/components/ui/home/ui/movie/SectionTitle'

export default function AnimeMovie({ data }: { data: AnimeResponse }) {
    return (
        <div className='flex flex-col space-y-4 sm:space-y-6 md:space-y-8'>
            <SectionTitle title="Movie" />

            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
                {data?.data.movie.animeList.map((anime, index) => (
                    <AnimeMovieCard
                        key={`${anime.animeId}-${index}`}
                        anime={anime}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}
