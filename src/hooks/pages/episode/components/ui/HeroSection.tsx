import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { HeroSectionProps } from '@/hooks/pages/episode/types/types';

export default function HeroSection({ episode }: HeroSectionProps) {
    return (
        <div className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={episode.poster}
                    alt={`${episode.title} background`}
                    fill
                    className="object-cover object-center filter blur-sm brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
                    {/* Episode Poster */}
                    <motion.div
                        className="w-32 sm:w-40 md:w-48 lg:w-56 flex-shrink-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 hover:border-primary/60 transform hover:scale-[1.02] transition-all duration-300">
                            <Image
                                src={episode.poster}
                                alt={`${episode.title} poster`}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 33vw, 25vw"
                            />
                        </div>
                    </motion.div>

                    {/* Title Section */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                            {episode.title}
                        </h1>
                        <div className="space-y-1 mt-2">
                            <p className="text-xl sm:text-2xl text-white/90 font-medium flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Released: {episode.releasedOn}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 