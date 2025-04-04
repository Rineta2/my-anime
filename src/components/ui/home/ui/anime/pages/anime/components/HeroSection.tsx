import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { HeroSectionProps } from '@/components/ui/home/ui/anime/pages/anime/types/anime'

export default function HeroSection({ anime }: HeroSectionProps) {
    return (
        <div className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={anime.poster}
                    alt={`${anime.japanese || anime.english || 'Anime'} background`}
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
                                alt={`${anime.japanese || anime.english || 'Anime'} poster`}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 33vw, 25vw"
                            />

                            {/* Score Badge */}
                            {anime.score && (
                                <div className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-lg font-bold">{anime.score.value}</span>
                                        <span className="text-xs opacity-90">({anime.score.users})</span>
                                    </div>
                                </div>
                            )}
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
                            {anime.japanese}
                        </h1>
                        <div className="space-y-1 mt-2">
                            {anime.english && (
                                <h2 className="text-xl sm:text-2xl text-white/90 font-medium">
                                    {anime.english}
                                </h2>
                            )}
                            {anime.synonyms && (
                                <p className="text-sm text-white/80 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    Also known as: {anime.synonyms}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 