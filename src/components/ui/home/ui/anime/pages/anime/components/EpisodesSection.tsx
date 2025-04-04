import React from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { EpisodesSectionProps } from '@/components/ui/home/ui/anime/pages/anime/types/anime'

import { Episode } from '@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime'

import { transformUrl } from '@/components/ui/home/ui/anime/pages/anime/utils/urlUtils'

export default function EpisodesSection({ anime }: EpisodesSectionProps) {
    if (!anime.episodeList || anime.episodeList.length === 0) {
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Episodes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {anime.episodeList.map((episode: Episode, index: number) => (
                    <motion.div
                        key={episode.episodeId}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                    >
                        <Link
                            href={transformUrl(episode.href)}
                            className="block p-4 bg-card-bg/70 rounded-xl border border-card-border shadow-md hover:shadow-xl hover:border-accent/50 transform hover:scale-[1.02] transition-all duration-300 group"
                        >
                            <span className="font-medium text-text group-hover:text-accent transition-colors duration-300 text-base flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                </svg>
                                Episode {episode.title}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
} 