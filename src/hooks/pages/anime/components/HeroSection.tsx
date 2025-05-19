'use client';

import React from 'react'

import Image from 'next/image'

import { HeroSectionProps } from '@/hooks/pages/anime/types/anime'

import { useAuth } from '@/utils/context/AuthContext'

import { FaBookmark } from 'react-icons/fa'

import toast from 'react-hot-toast'

const DEFAULT_POSTER = '/images/default-poster.jpg';

export default function HeroSection({ anime }: HeroSectionProps) {
    const { user, addToBookmarks, bookmarks } = useAuth();
    const [isBookmarked, setIsBookmarked] = React.useState(false);

    const posterUrl = anime.poster || DEFAULT_POSTER;
    const animeTitle = anime.title || 'Untitled Anime';
    const animeSlug = animeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    React.useEffect(() => {
        if (user && animeTitle) {
            const isAnimeBookmarked = Object.values(bookmarks).some(
                bookmark => bookmark.href === `/anime/${animeSlug}`
            );
            setIsBookmarked(isAnimeBookmarked);
        }
    }, [user, bookmarks, animeTitle, animeSlug]);

    const handleBookmark = async () => {
        if (!user) {
            toast.error('Please login to add bookmarks');
            return;
        }

        // Get the current URL path
        const currentPath = window.location.pathname;
        // Extract the anime slug from the URL
        const currentSlug = currentPath.split('/').pop() || '';

        const bookmarkData = {
            title: animeTitle,
            poster: posterUrl,
            href: `/anime/${currentSlug}`
        };

        // Find existing bookmark with the same href
        const existingBookmarkEntry = Object.entries(bookmarks).find(
            ([, bookmark]) => bookmark.href === bookmarkData.href
        );

        if (existingBookmarkEntry) {
            toast.error('Anda telah menambahkan ke bookmarks');
            return;
        }

        // If bookmark doesn't exist, add it
        const success = await addToBookmarks(bookmarkData);
        if (success) {
            setIsBookmarked(true);
        }
    };

    return (
        <div className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={posterUrl}
                    alt={`${animeTitle} background`}
                    fill
                    className="object-cover object-center filter blur-sm brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
                    {/* Anime Poster */}
                    <div className="w-32 sm:w-40 md:w-48 lg:w-56 flex-shrink-0">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 hover:border-primary/60 transform hover:scale-[1.02] transition-all duration-300">
                            <Image
                                src={posterUrl}
                                alt={`${animeTitle} poster`}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 33vw, 25vw"
                            />

                            {/* Bookmark Button */}
                            <button
                                onClick={handleBookmark}
                                className={`absolute bottom-2 right-2 p-2 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 ${isBookmarked
                                    ? 'bg-primary text-white hover:bg-primary-hover'
                                    : 'bg-white/10 text-white hover:bg-primary/80'
                                    }`}
                                title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                            >
                                <FaBookmark size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Title Section */}
                    <div className="flex-1 space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                            {animeTitle}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-text-secondary">
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                                Type: {anime.type || 'N/A'}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                                Status: {anime.status || 'N/A'}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                                Duration: {anime.duration || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 