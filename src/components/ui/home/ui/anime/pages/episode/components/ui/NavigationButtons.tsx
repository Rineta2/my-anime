import React from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { NavigationButtonsProps } from '@/components/ui/home/ui/anime/pages/episode/types/types';

export default function NavigationButtons({ episode }: NavigationButtonsProps) {
    return (
        <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {episode.hasPrevEpisode && episode.prevEpisode && (
                <Link
                    href={episode.prevEpisode.href.replace("/samehadaku/", "/")}
                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/20 text-base font-medium flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Episode
                </Link>
            )}
            {episode.hasNextEpisode && episode.nextEpisode && (
                <Link
                    href={episode.nextEpisode.href.replace("/samehadaku/", "/")}
                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/20 text-base font-medium flex items-center gap-2"
                >
                    Next Episode
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            )}
        </motion.div>
    );
} 