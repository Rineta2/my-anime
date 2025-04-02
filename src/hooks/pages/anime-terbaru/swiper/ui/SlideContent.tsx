import Image from 'next/image'

import Link from 'next/link'

import { FiPlay } from 'react-icons/fi'

import { SlideContentProps } from '@/hooks/pages/types/AnimeTerbaru'

export default function SlideContent({ anime }: SlideContentProps) {
    return (
        <div className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
                {anime.poster && (
                    <Image
                        src={anime.poster}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl space-y-3 sm:space-y-4">
                        <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-xs sm:text-sm font-medium border border-primary/30">
                            Episode {anime.episodes}
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {anime.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm border border-white/20">
                                {anime.releasedOn}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 pt-2 sm:pt-4">
                            {anime.href && (
                                <Link
                                    href={anime.href}
                                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary-hover text-white rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                                >
                                    <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Watch Now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 