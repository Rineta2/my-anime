import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { getAnimeDetail } from "@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime"

import ErrorAnime from "@/components/ui/home/ui/anime/pages/anime/ui/ErrorAnime"

import type { Genre, Episode, Connection } from "@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime"

interface AnimePageProps {
    params: {
        slug: string
    }
}

export default async function AnimePage({ params }: AnimePageProps) {
    const slug = await Promise.resolve(params.slug);
    const response = await getAnimeDetail(slug);
    const anime = response.data;

    if (!anime || !anime.poster) {
        return <ErrorAnime />;
    }

    // Helper function to transform URLs
    const transformUrl = (url: string) => {
        return url.replace('/samehadaku/', '/');
    };

    return (
        <section className='min-h-screen py-20'>
            <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
                {/* Hero Section with Parallax Effect */}
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
                            <div className="w-32 sm:w-40 md:w-48 lg:w-56 flex-shrink-0">
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
                            </div>

                            {/* Title Section */}
                            <div className="flex-1">
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Synopsis */}
                            {anime.synopsis && anime.synopsis.paragraphs.length > 0 && (
                                <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                                    <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                                        </svg>
                                        Synopsis
                                    </h2>
                                    <div className="space-y-4 text-text-secondary text-base md:text-lg leading-relaxed">
                                        {anime.synopsis.paragraphs.map((paragraph: string, index: number) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Episodes */}
                            {anime.episodeList && anime.episodeList.length > 0 && (
                                <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                                    <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Episodes
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {anime.episodeList.map((episode: Episode) => (
                                            <Link
                                                key={episode.episodeId}
                                                href={transformUrl(episode.href)}
                                                className="p-4 bg-card-bg/70 rounded-xl border border-card-border shadow-md hover:shadow-xl hover:border-accent/50 transform hover:scale-[1.02] transition-all duration-300 group"
                                            >
                                                <span className="font-medium text-text group-hover:text-accent transition-colors duration-300 text-base flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                                    </svg>
                                                    Episode {episode.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Anime */}
                            {anime.synopsis?.connections && anime.synopsis.connections.length > 0 && (
                                <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                                    <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Related Anime
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {anime.synopsis.connections.map((connection: Connection) => (
                                            <Link
                                                key={connection.animeId}
                                                href={transformUrl(connection.href)}
                                                className="p-4 bg-card-bg/70 rounded-xl border border-card-border shadow-md hover:shadow-xl hover:border-accent/50 transition-all duration-300 group"
                                            >
                                                <span className="text-base text-text hover:text-accent transition-colors duration-300 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                    </svg>
                                                    {connection.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:relative">
                            <div className="lg:sticky lg:top-24 space-y-8">
                                {/* Info Card */}
                                <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg">
                                    <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Information
                                    </h2>

                                    <div className="space-y-5">
                                        {[
                                            { label: "Status", value: anime.status, icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" },
                                            { label: "Type", value: anime.type, icon: "M7 4v16M17 4v16M3 8h18M3 16h18M3 12h18M3 4h18M17 8h4M17 16h4M7 8H3M7 16H3" },
                                            { label: "Source", value: anime.source, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                                            { label: "Episodes", value: anime.episodes, icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
                                            { label: "Duration", value: anime.duration, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                                            { label: "Studios", value: anime.studios, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                                            { label: "Producers", value: anime.producers, icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                                            { label: "Aired", value: anime.aired, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                                            { label: "Season", value: anime.season, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center gap-3 group">
                                                <span className="min-w-24 text-text-secondary group-hover:text-text transition-colors duration-300 font-medium flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                    </svg>
                                                    {item.label}:
                                                </span>
                                                <span className="font-semibold text-primary">
                                                    {item.value || 'N/A'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Genres */}
                                {anime.genreList && anime.genreList.length > 0 && (
                                    <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg">
                                        <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            Genres
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {anime.genreList.map((genre: Genre) => (
                                                <Link
                                                    key={genre.genreId}
                                                    href={transformUrl(genre.href)}
                                                    className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center gap-2"
                                                >
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                    </svg>
                                                    {genre.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 