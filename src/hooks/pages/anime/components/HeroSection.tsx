import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { HeroSectionProps } from '@/hooks/pages/anime/types/anime'
import { useAuth } from '@/utils/context/AuthContext'
import { FaBookmark } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function HeroSection({ anime }: HeroSectionProps) {
    const { user, addToBookmarks, bookmarks } = useAuth();
    const [isBookmarked, setIsBookmarked] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            const isAnimeBookmarked = Object.values(bookmarks).some(
                bookmark => bookmark.href === `/anime/${anime.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            );
            setIsBookmarked(isAnimeBookmarked);
        }
    }, [user, bookmarks, anime.title]);

    const handleBookmark = async () => {
        if (!user) {
            toast.error('Please login to add bookmarks');
            return;
        }

        // Get the current URL path
        const currentPath = window.location.pathname;
        // Extract the anime slug from the URL
        const animeSlug = currentPath.split('/').pop() || '';

        const bookmarkData = {
            title: anime.title || 'Unknown Title',
            poster: anime.poster,
            href: `/anime/${animeSlug}`
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
                    src={anime.poster}
                    alt={`${anime.title} background`}
                    fill
                    className="object-cover object-center filter blur-sm brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
                    {/* Anime Poster */}
                    <motion.div
                        className="w-32 sm:w-40 md:w-48 lg:w-56 flex-shrink-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 hover:border-primary/60 transform hover:scale-[1.02] transition-all duration-300">
                            <Image
                                src={anime.poster}
                                alt={`${anime.title} poster`}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 33vw, 25vw"
                            />

                            {/* Bookmark Button */}
                            <button
                                onClick={handleBookmark}
                                className={`absolute bottom-2 right-2 p-2 rounded-full backdrop-blur-sm shadow-lg transition-colors duration-300 ${isBookmarked
                                    ? 'bg-primary text-white'
                                    : 'bg-white/10 text-white hover:bg-primary/80'
                                    }`}
                                title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                            >
                                <FaBookmark size={16} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Title Section */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                            {anime.title}
                        </h1>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 