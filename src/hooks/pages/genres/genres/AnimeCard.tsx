import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { Anime } from '@/hooks/pages/types/Genre'

interface AnimeCardProps {
    anime: Anime
}

export default function AnimeCard({ anime }: AnimeCardProps) {
    return (
        <Link
            key={anime.animeId}
            href={anime.href}
            className="group bg-[var(--card-bg)] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--primary)]/10 overflow-hidden transform hover:-translate-y-1"
        >
            <div className="relative h-56 sm:h-80 overflow-hidden">
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4 sm:p-5">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 line-clamp-2 text-[var(--primary)] group-hover:text-[var(--primary)]/80 transition-colors duration-200">
                    {anime.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full">
                        {anime.type}
                    </span>

                    <span className={`text-xs sm:text-sm px-2 py-1 rounded-full ${anime.status === 'Ongoing'
                        ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                        : 'text-[var(--primary)]/60 bg-[var(--primary)]/5'
                        }`}>
                        {anime.status}
                    </span>
                </div>
                {anime.score && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--primary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{anime.score}</span>
                    </div>
                )}
            </div>
        </Link>
    )
} 