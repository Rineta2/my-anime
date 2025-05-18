import React from 'react'
import Image from 'next/image'
import { Anime } from '@/components/ui/home/types/home'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AnimeCardProps {
    anime: Anime
    index: number
}

export default function AnimeCard({ anime, index }: AnimeCardProps) {
    return (
        <Link
            href={anime.href}
            key={`${anime.animeId}-${index}`}
            className="group bg-background/60 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-border-color/50 hover:border-primary/50"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-48 xs:h-52 sm:h-56 md:h-64 lg:h-72 overflow-hidden"
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

                <div className='absolute bottom-0 left-0 right-0 px-4 py-2 bg-primary w-fit'>
                    <span className="font-semibold text-white text-sm sm:text-base">{anime.releasedOn}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.53)] via-[rgba(0,0,0,0.53)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                className="px-4 py-4 flex flex-col gap-2 sm:gap-3 md:gap-4"
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {anime.title}
                </h2>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-text-secondary">Episodes</span>
                    <span className="font-semibold text-primary">{anime.episode}</span>
                </div>
            </motion.div>
        </Link>
    )
} 