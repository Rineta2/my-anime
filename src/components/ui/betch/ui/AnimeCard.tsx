import React from 'react'

import Image from 'next/image'

import { Bath } from '@/components/ui/home/types/home'
import Link from 'next/link'

interface AnimeCardProps {
    anime: Bath
    index: number
}

export default function AnimeCard({ anime, index }: AnimeCardProps) {
    return (
        <Link href={anime.href}
            className="group relative bg-background/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-border-color/30 hover:border-purple-500/50 hover:bg-background/90"
        >
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                />

                <div className='absolute bottom-0 left-0 right-0 px-4 py-2 bg-purple-400 w-fit'>
                    <span className="font-semibold text-white text-sm sm:text-base">{anime.releasedOn}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.53)] via-[rgba(0,0,0,0.53)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            </div>

            <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-text line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                    {anime.title}
                </h2>

                <div className="flex items-center justify-between">
                    <span className="text-text-secondary/80">Episodes</span>
                    <span className="font-semibold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full text-sm">
                        {anime.episodes}
                    </span>
                </div>
            </div>
        </Link>
    )
} 