import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { RelatedMoviesProps, AnimeItem } from '@/hooks/pages/episode/types/types';

export default function RelatedMovies({ episode }: RelatedMoviesProps) {
    if (!episode.recommendedSeries || !episode.recommendedSeries.animeList || episode.recommendedSeries.animeList.length === 0) {
        return null;
    }

    return (
        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18M3 12h18M3 4h18M17 8h4M17 16h4M7 8H3M7 16H3" />
                </svg>
                Recommended Series
            </h2>
            <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {episode.recommendedSeries.animeList.map((anime: AnimeItem) => (
                    <div
                        key={anime.animeId}
                    >
                        <Link
                            href={anime.href}
                            className="group"
                        >
                            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg border border-card-border/50 transform group-hover:scale-[1.03] transition-all duration-300 group-hover:shadow-accent/20">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-xs font-medium text-white/90">{anime.episode}</p>
                                </div>
                            </div>
                            <h3 className="mt-3 text-base font-medium text-text line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                {anime.title}
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
} 