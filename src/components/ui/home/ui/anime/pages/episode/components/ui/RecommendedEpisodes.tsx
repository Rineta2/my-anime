import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { RecommendedEpisodesProps } from '@/components/ui/home/ui/anime/pages/episode/types/types';

export default function RecommendedEpisodes({ episode, currentSlug }: RecommendedEpisodesProps) {
    if (!episode.EpisodeList || episode.EpisodeList.length === 0) {
        return null;
    }

    return (
        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Episode List
            </h2>
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {episode.EpisodeList.map((episodeItem, index) => {
                    const episodeSlug = episodeItem.href.split('/').pop();
                    const isActive = episodeSlug === currentSlug;

                    return (
                        <motion.div
                            key={`${episodeItem.episodeId}-${episodeItem.title}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Link
                                href={episodeItem.href}
                                className={`group ${isActive ? 'pointer-events-none' : ''}`}
                            >
                                <div className={`relative h-48 rounded-xl overflow-hidden shadow-lg border ${isActive ? 'border-accent border-2' : 'border-card-border/50'} transform group-hover:scale-[1.03] transition-all duration-300 group-hover:shadow-accent/20`}>
                                    <Image
                                        src={episodeItem.poster}
                                        alt={episodeItem.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                                    <div className={`absolute bottom-0 left-0 right-0 p-3 text-white ${isActive ? 'translate-y-0' : 'transform translate-y-full group-hover:translate-y-0'} transition-transform duration-300`}>
                                        <p className="text-xs font-medium text-white/90">{episodeItem.releaseDate}</p>
                                        {isActive && (
                                            <p className="text-xs font-bold text-accent mt-1">Current Episode</p>
                                        )}
                                    </div>
                                </div>
                                <h3 className={`mt-3 text-base font-medium ${isActive ? 'text-accent' : 'text-text group-hover:text-accent'} line-clamp-2 transition-colors duration-300`}>
                                    {episodeItem.title}
                                </h3>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
} 