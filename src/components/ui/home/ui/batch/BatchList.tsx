import React from 'react'
import { AnimeResponse } from '@/components/ui/home/types/home'
import AnimeCard from './AnimeCard'

interface BatchListProps {
    batchList: AnimeResponse['data']['batch']['batchList']
}

export default function BatchList({ batchList }: BatchListProps) {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
            {batchList.map((anime, index) => (
                <AnimeCard
                    key={`${anime.animeId}-${index}`}
                    anime={anime}
                    index={index}
                />
            ))}
        </div>
    )
} 