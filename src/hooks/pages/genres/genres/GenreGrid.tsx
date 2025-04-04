import React from 'react'

import AnimeCard from './AnimeCard'

import { Anime } from '@/hooks/pages/types/Genre'

interface GenreGridProps {
    animeList: Anime[]
}

export default function GenreGrid({ animeList }: GenreGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {animeList.map((anime) => (
                <AnimeCard key={anime.animeId} anime={anime} />
            ))}
        </div>
    )
} 