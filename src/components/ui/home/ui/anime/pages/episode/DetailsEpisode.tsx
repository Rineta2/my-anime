"use client";

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { getEpisodeData } from '@/components/ui/home/ui/anime/pages/episode/lib/FetchEpisode';

import ServerSelection from '@/components/ui/home/ui/anime/pages/episode/components/ServerSelection';

import { Episode, EpisodePageProps } from '@/components/ui/home/ui/anime/pages/episode/types/types';

import DetailsEpisodeSkeleton from "@/components/ui/home/ui/anime/pages/episode/DetailsEpisodeSkelaton";

import HeroSection from '@/components/ui/home/ui/anime/pages/episode/components/ui/HeroSection';

import NavigationButtons from '@/components/ui/home/ui/anime/pages/episode/components/ui/NavigationButtons';

import DownloadSection from '@/components/ui/home/ui/anime/pages/episode/components/ui/DownloadSection';

import RecommendedEpisodes from '@/components/ui/home/ui/anime/pages/episode/components/ui/RecommendedEpisodes';

import RelatedMovies from '@/components/ui/home/ui/anime/pages/episode/components/ui/RelatedMovies';

import GenresSection from '@/components/ui/home/ui/anime/pages/episode/components/ui/GenresSection';

import SynopsisSection from '@/components/ui/home/ui/anime/pages/episode/components/ui/SynopsisSection';

import { useAuth } from '@/utils/context/AuthContext';

import { addToViewHistory } from '@/utils/firebase/history';

export default function EpisodePage({ params }: EpisodePageProps) {
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getEpisodeData(params.slug);
                setEpisode(data as Episode);
                setError(null);

                if (user && data) {
                    await addToViewHistory(user, data, params.slug);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.slug, user]);

    if (loading) {
        return (
            <DetailsEpisodeSkeleton />
        );
    }

    if (error || !episode) {
        return (
            <section className='min-h-screen py-20 lg:py-16 bg-gradient-to-b from-background via-background/95 to-background/90 flex items-center justify-center'>
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-8 border border-card-border shadow-lg max-w-2xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-6 text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-text mb-4">Error Loading Episode</h1>
                            <p className="text-text-secondary mb-6">
                                {error ? error.message : 'An unexpected error occurred while loading the episode.'}
                            </p>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-all duration-300 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='min-h-screen py-20 lg:py-16 bg-gradient-to-b from-background via-background/95 to-background/90'>
            {/* Hero Section */}
            <HeroSection episode={episode} />

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                        {/* Navigation Buttons */}
                        <NavigationButtons episode={episode} />

                        {/* Server Selection Component */}
                        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Watch Episode
                            </h2>
                            <ServerSelection servers={episode.server} defaultUrl={episode.defaultStreamingUrl} />
                        </div>

                        {/* Download Section */}
                        <DownloadSection episode={episode} />

                        {/* Recommended Episodes */}
                        <RecommendedEpisodes episode={episode} currentSlug={params.slug} />

                        {/* Related Movies */}
                        <RelatedMovies episode={episode} />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:relative order-1 lg:order-2">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            {/* Genres */}
                            <GenresSection episode={episode} />

                            {/* Synopsis */}
                            <SynopsisSection episode={episode} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
