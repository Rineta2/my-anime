import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { getEpisodeData } from './lib/FetchEpisode';

import ServerSelection from './components/ServerSelection';

interface EpisodePageProps {
    params: {
        slug: string;
    };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    try {
        const episode = await getEpisodeData(params.slug);
        return (
            <section className="min-h-screen bg-gradient-to-b from-background via-background/98 to-background/95">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Episode Poster */}
                        <div className="w-full lg:w-1/3 xl:w-1/4">
                            <div className="sticky top-24">
                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 hover:border-primary/40 transform hover:scale-[1.02] transition-all duration-300">
                                    <Image
                                        src={episode.poster}
                                        alt={`${episode.title} poster`}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Episode Details */}
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight leading-tight">
                                    {episode.title}
                                </h1>
                                <div className="space-y-2">
                                    <p className="text-2xl sm:text-3xl text-text-secondary font-medium flex items-center gap-2">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Released: {episode.releasedOn}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4">
                                {episode.hasPrevEpisode && episode.prevEpisode && (
                                    <Link
                                        href={episode.prevEpisode.href.replace("/samehadaku/", "/")}
                                        className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/20 text-base font-medium flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous Episode
                                    </Link>
                                )}
                                {episode.hasNextEpisode && episode.nextEpisode && (
                                    <Link
                                        href={episode.nextEpisode.href.replace("/samehadaku/", "/")}
                                        className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/20 text-base font-medium flex items-center gap-2"
                                    >
                                        Next Episode
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                )}
                            </div>

                            {/* Server Selection Component */}
                            <ServerSelection servers={episode.server} defaultUrl={episode.defaultStreamingUrl} />

                            {/* Genres */}
                            {episode.genreList && episode.genreList.length > 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Genres
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {episode.genreList.map((genre) => (
                                            <Link
                                                key={genre.genreId}
                                                href={genre.href}
                                                className="px-5 py-2.5 bg-accent/10 text-accent rounded-full text-base font-medium hover:bg-accent/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                </svg>
                                                {genre.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Synopsis */}
                            {episode.synopsis && episode.synopsis.paragraphs && episode.synopsis.paragraphs.length > 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                                        </svg>
                                        Synopsis
                                    </h2>
                                    <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                                        {episode.synopsis.paragraphs.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Download Section */}
                            {episode.downloadUrl && episode.downloadUrl.formats && episode.downloadUrl.formats.length > 0 && (
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Options
                                    </h2>
                                    {episode.downloadUrl.formats.map((format) => (
                                        <div key={format.title} className="space-y-6 bg-card-bg rounded-2xl p-6 border border-card-border shadow-lg">
                                            <h3 className="text-2xl font-semibold text-accent flex items-center gap-2">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                                </svg>
                                                {format.title}
                                            </h3>
                                            <div className="space-y-6">
                                                {format.qualities.map((quality) => (
                                                    <div key={quality.title} className="space-y-4">
                                                        <h4 className="text-lg font-medium text-text flex items-center gap-2">
                                                            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {quality.title}
                                                        </h4>
                                                        <div className="flex flex-wrap gap-3">
                                                            {quality.urls.map((url) => (
                                                                <a
                                                                    key={url.title}
                                                                    href={url.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/20 text-base font-medium flex items-center gap-2"
                                                                >
                                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                                                    </svg>
                                                                    {url.title}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Recommended Episodes */}
                            {episode.recommendedEpisodeList && episode.recommendedEpisodeList.length > 0 && (
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Recommended Episodes
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {episode.recommendedEpisodeList.map((rec) => (
                                            <Link
                                                key={`${rec.episodeId}-${rec.title}`}
                                                href={rec.href}
                                                className="group"
                                            >
                                                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-card-border transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-accent/20">
                                                    <Image
                                                        src={rec.poster}
                                                        alt={rec.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 50vw, 25vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                                <h3 className="mt-3 text-lg font-medium text-text line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                    {rec.title}
                                                </h3>
                                                <p className="text-sm text-text-secondary">{rec.releaseDate}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Movies */}
                            {episode.movie && episode.movie.animeList && episode.movie.animeList.length > 0 && (
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18M3 12h18M3 4h18M17 8h4M17 16h4M7 8H3M7 16H3" />
                                        </svg>
                                        Related Movies
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {episode.movie.animeList.map((movie) => (
                                            <Link
                                                key={movie.animeId}
                                                href={movie.href}
                                                className="group"
                                            >
                                                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-card-border transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-accent/20">
                                                    <Image
                                                        src={movie.poster}
                                                        alt={movie.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 50vw, 25vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                                <h3 className="mt-3 text-lg font-medium text-text line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                    {movie.title}
                                                </h3>
                                                <p className="text-sm text-text-secondary">{movie.releaseDate}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-red-800 mb-4">Error Loading Episode</h1>
                    <p className="text-red-600">
                        {error instanceof Error ? error.message : 'An unexpected error occurred while loading the episode.'}
                    </p>
                </div>
            </div>
        );
    }
}
