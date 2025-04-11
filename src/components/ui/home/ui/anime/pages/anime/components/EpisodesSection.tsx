import React, { useState } from 'react'
import Link from 'next/link'
import { EpisodesSectionProps } from '@/components/ui/home/ui/anime/pages/anime/types/anime'
import { Episode } from '@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime'
import { transformUrl } from '@/components/ui/home/ui/anime/pages/anime/utils/urlUtils'
import { FaPlay } from 'react-icons/fa'

export default function EpisodesSection({ anime }: EpisodesSectionProps) {
    const [showAllEpisodes, setShowAllEpisodes] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!anime.episodeList || anime.episodeList.length === 0) {
        return null;
    }

    const displayedEpisodes = showAllEpisodes
        ? anime.episodeList
        : anime.episodeList.slice(0, 20);

    const handleToggleEpisodes = () => {
        setIsLoading(true);
        setTimeout(() => {
            setShowAllEpisodes(!showAllEpisodes);
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Episodes
                </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {displayedEpisodes.map((episode: Episode) => (
                    <Link
                        key={episode.episodeId}
                        href={transformUrl(episode.href)}
                        className="block p-4 bg-card-bg/70 rounded-xl border border-card-border shadow-md hover:shadow-xl hover:border-accent/50 transform hover:scale-[1.02] transition-all duration-300 group relative"
                    >
                        <span className="font-medium text-text group-hover:text-accent transition-colors duration-300 text-base flex items-center gap-2">
                            <FaPlay className="w-4 h-4" />
                            Episode {episode.title}
                        </span>
                    </Link>
                ))}
            </div>
            {anime.episodeList.length > 20 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleToggleEpisodes}
                        disabled={isLoading}
                        className="px-6 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors duration-300 font-medium flex items-center gap-2 min-w-[120px] justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </>
                        ) : (
                            showAllEpisodes ? 'Show Less' : 'Show More'
                        )}
                    </button>
                </div>
            )}
        </div>
    )
} 