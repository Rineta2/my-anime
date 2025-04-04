import Image from 'next/image'

import Link from 'next/link'

import { StarIcon } from "@/hooks/pages/jadwal-rilis/ui/Icons"

import { AnimeCardProps } from "@/hooks/pages/types/JadwalRilis"

export default function AnimeCard({ anime }: AnimeCardProps) {
    return (
        <div className="group bg-hover-bg/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-card-border/50 hover:border-primary/30 hover:scale-[1.02]">
            <div className="relative h-48 xs:h-52 sm:h-64 overflow-hidden">
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-3 sm:p-5">
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-2 text-text group-hover:text-primary transition-colors duration-300">
                    {anime.title}
                </h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full border border-primary/20">
                        {anime.type}
                    </span>
                    {anime.score && (
                        <span className="px-2 sm:px-3 py-1 bg-secondary/10 text-secondary text-xs sm:text-sm rounded-full border border-secondary/20 flex items-center">
                            <StarIcon />
                            {anime.score}
                        </span>
                    )}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary/80 mb-3 sm:mb-4 line-clamp-2">{anime.genres}</p>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm text-text-secondary/70">{anime.estimation}</span>
                    <Link
                        href={anime.href}
                        className="text-primary hover:text-primary-hover text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 border border-primary/20 hover:border-primary/40 text-center"
                    >
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    )
} 