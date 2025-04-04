import React from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { RelatedAnimeSectionProps } from '@/components/ui/home/ui/anime/pages/anime/types/anime'

import { Connection } from '@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime'

import { transformUrl } from '@/components/ui/home/ui/anime/pages/anime/utils/urlUtils'

export default function RelatedAnimeSection({ anime }: RelatedAnimeSectionProps) {
    if (!anime.synopsis?.connections || anime.synopsis.connections.length === 0) {
        return null;
    }

    return (
        <motion.div
            className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Related Anime
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {anime.synopsis.connections.map((connection: Connection, index: number) => (
                    <motion.div
                        key={connection.animeId}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                    >
                        <Link
                            href={transformUrl(connection.href)}
                            className="block p-4 bg-card-bg/70 rounded-xl border border-card-border shadow-md hover:shadow-xl hover:border-accent/50 transition-all duration-300 group"
                        >
                            <span className="text-base text-text hover:text-accent transition-colors duration-300 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                {connection.title}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
} 