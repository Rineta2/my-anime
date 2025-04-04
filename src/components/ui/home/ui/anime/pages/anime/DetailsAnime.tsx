'use client'

import React from 'react'

import { getAnimeDetail } from "@/components/ui/home/ui/anime/pages/anime/lib/FetchAnime"

import ErrorAnime from "@/components/ui/home/ui/anime/pages/anime/ui/ErrorAnime"

import { AnimePageProps, AnimeData } from "@/components/ui/home/ui/anime/pages/anime/types/anime"

import DetailsAnimeSkeleton from "@/components/ui/home/ui/anime/pages/anime/DetailsAnimeSkelaton"

import HeroSection from '@/components/ui/home/ui/anime/pages/anime/components/HeroSection'

import SynopsisSection from '@/components/ui/home/ui/anime/pages/anime/components/SynopsisSection'

import EpisodesSection from '@/components/ui/home/ui/anime/pages/anime/components/EpisodesSection'

import RelatedAnimeSection from '@/components/ui/home/ui/anime/pages/anime/components/RelatedAnimeSection'

import InfoCard from '@/components/ui/home/ui/anime/pages/anime/components/InfoCard'

import GenresSection from '@/components/ui/home/ui/anime/pages/anime/components/GenresSection'

export default function AnimePage({ params }: AnimePageProps) {
    const [anime, setAnime] = React.useState<AnimeData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAnimeDetail(params.slug);
                setAnime(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching anime data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [params.slug]);

    if (loading) {
        return <DetailsAnimeSkeleton />
    }

    if (error || !anime || !anime.poster) {
        return <ErrorAnime />;
    }

    return (
        <section className='min-h-screen py-20'>
            <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
                {/* Hero Section with Parallax Effect */}
                <HeroSection anime={anime} />

                {/* Main Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Synopsis */}
                            <SynopsisSection anime={anime} />

                            {/* Episodes */}
                            <EpisodesSection anime={anime} />

                            {/* Related Anime */}
                            <RelatedAnimeSection anime={anime} />
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:relative">
                            <div className="lg:sticky lg:top-24 space-y-8">
                                {/* Info Card */}
                                <InfoCard anime={anime} />

                                {/* Genres */}
                                <GenresSection anime={anime} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 