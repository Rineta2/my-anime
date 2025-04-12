"use client"

import Image from 'next/image'

import Link from 'next/link'

import { FiPlay } from 'react-icons/fi'

import { motion } from 'framer-motion'

import { SlideContentProps } from '@/hooks/pages/types/AnimeTerbaru'

export default function SlideContent({ anime }: SlideContentProps) {
    return (
        <div key={anime.href} className="relative w-full h-full px-8">
            {/* Background Image */}
            {anime.poster && (
                <motion.div
                    className="absolute inset-0"
                >
                    <motion.div
                        className="w-full h-full"
                    >
                        <Image
                            src={anime.poster}
                            alt={anime.title}
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl space-y-3 sm:space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-rgb), 0.3)" }}
                            className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-xs sm:text-sm font-medium border border-primary/30"
                        >
                            <motion.span
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Episode {anime.episodes}
                            </motion.span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ color: "rgba(var(--primary-rgb), 0.9)" }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                        >
                            <motion.span
                                animate={{ opacity: [0.9, 1, 0.9] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {anime.title}
                            </motion.span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex items-center gap-2"
                        >
                            <motion.span
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm border border-white/20"
                            >
                                <motion.span
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {anime.releasedOn}
                                </motion.span>
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex items-center gap-4 pt-2 sm:pt-4"
                        >
                            {anime.href && (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={anime.href}
                                        className="group/btn inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary-hover text-white rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                                    >
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </motion.div>
                                        <motion.span
                                            animate={{ opacity: [0.9, 1, 0.9] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            Watch Now
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
} 