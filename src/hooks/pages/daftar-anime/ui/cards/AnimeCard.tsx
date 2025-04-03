import Image from 'next/image'

import { AnimeCardProps } from '@/hooks/pages/types/Anime'

export default function AnimeCard({
    anime,
    showGenres = true,
    showScore = true,
    showEstimation = false,
    showReleasedOn = false
}: AnimeCardProps) {
    return (
        <div className="group bg-[var(--card-bg)] rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[var(--card-border)]">
            <div className="relative h-[150px] sm:h-[200px] overflow-hidden">
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-[var(--primary)] transition-colors text-[var(--text)]">
                    {anime.title}
                </h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[var(--text-secondary)]">{anime.type}</span>
                    {showScore && anime.score && (
                        <span className="text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full">
                            {anime.score}
                        </span>
                    )}
                </div>
                {showEstimation && anime.estimation && (
                    <div className="mb-2">
                        <span className="text-sm font-medium bg-[var(--success)]/10 text-[var(--success)] px-2 py-1 rounded-full">
                            {anime.estimation}
                        </span>
                    </div>
                )}
                {showReleasedOn && (
                    <div className="flex items-center justify-between mb-2 flex-col sm:flex-row">
                        <span className="text-sm text-[var(--text-secondary)]">Episode {anime.episodes}</span>
                        <span className="text-sm font-medium bg-[var(--success)]/10 text-[var(--success)] px-2 py-1 rounded-full">
                            {anime.releasedOn}
                        </span>
                    </div>
                )}
                {showGenres && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {anime.genres?.split(', ').map((genre: string) => (
                            <span
                                key={genre}
                                className="text-xs bg-[var(--hover-bg)] text-[var(--text)] px-2 py-1 rounded-full"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}
                <a
                    href={anime.href}
                    className="block w-full text-center bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white py-2 rounded-lg hover:from-[var(--primary-hover)] hover:to-[var(--primary)] transition-colors duration-300"
                >
                    Watch Now
                </a>
            </div>
        </div>
    )
} 