import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimeMovieData } from '../../home/types/home'

interface AnimeMovieCardProps {
    anime: AnimeMovieData
    index: number
}

export default function AnimeMovieCard({ anime, index }: AnimeMovieCardProps) {
    return (
        <div className="group bg-background/60 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-border-color/50 hover:border-primary/50">
            <Link href={anime.href} className="block">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative h-40 xs:h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden"
                >
                    <Image
                        src={anime.poster}
                        alt={anime.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={index < 4}
                        loading={index < 4 ? "eager" : "lazy"}
                        quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.53)] via-[rgba(0,0,0,0.53)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    className="px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-2 sm:gap-3"
                >
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-text line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {anime.title}
                    </h2>

                    <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-sm sm:text-base text-text-secondary">Release Date</span>
                            <span className="font-semibold text-sm sm:text-base text-primary">{anime.releaseDate}</span>
                        </div>
                    </div>
                </motion.div>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="px-3 pb-3 sm:px-4 sm:pb-4"
            >
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {anime.genreList.map((genre, index) => (
                        <Link
                            key={index}
                            href={genre.href}
                            className="font-medium text-center line-clamp-2 bg-primary/80 hover:bg-primary px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg w-fit transition-all duration-300 hover:shadow-md hover:shadow-primary/20 text-xs sm:text-sm"
                        >
                            {genre.title}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    )
} 