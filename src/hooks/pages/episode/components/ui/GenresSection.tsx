import React from 'react';

import Link from 'next/link';

import { GenresSectionProps, GenreItem } from '@/hooks/pages/episode/types/types';

export default function GenresSection({ episode }: GenresSectionProps) {
    if (!episode.genreList || episode.genreList.length === 0) {
        return null;
    }

    return (
        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg">
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Genres
            </h2>
            <div
                className="flex flex-wrap gap-2"
            >
                {episode.genreList.map((genre: GenreItem) => (
                    <div
                        key={genre.genreId}
                    >
                        <Link
                            href={genre.href}
                            className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center gap-2"
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            {genre.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
} 