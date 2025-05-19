'use client';

import React from 'react'

import Link from 'next/link'

import { RelatedAnimeSectionProps } from '@/hooks/pages/anime/types/anime'

import { transformUrl } from '@/hooks/pages/anime/utils/urlUtils'

import Image from 'next/image'

export default function RelatedAnimeSection({ anime }: RelatedAnimeSectionProps) {
    if (!anime.recommendedAnimeList || anime.recommendedAnimeList.length === 0) {
        return null;
    }

    return (
        <div
            className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg"
        >
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Recommended Anime
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {anime.recommendedAnimeList.map((anime) => (
                    <div
                        key={anime.animeId}
                    >
                        <Link
                            href={transformUrl(anime.href)}
                            className="block group"
                        >
                            <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="text-sm font-medium text-text line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                {anime.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-text/70">{anime.type}</span>
                                <span className="text-xs text-text/70">•</span>
                                <span className="text-xs text-text/70">{anime.episode}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
} 