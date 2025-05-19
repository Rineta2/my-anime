import DetailsAnimeSkeleton from "@/hooks/pages/anime/DetailsAnimeSkelaton"

import HeroSection from '@/hooks/pages/anime/components/HeroSection'

import SynopsisSection from '@/hooks/pages/anime/components/SynopsisSection'

import EpisodesSection from '@/hooks/pages/anime/components/EpisodesSection'

import RelatedAnimeSection from '@/hooks/pages/anime/components/RelatedAnimeSection'

import InfoCard from '@/hooks/pages/anime/components/InfoCard'

import GenresSection from '@/hooks/pages/anime/components/GenresSection'

import { fetchAnimeBySlug } from '@/hooks/pages/anime/lib/FetchAnime'

import type { AnimeData } from '@/hooks/pages/anime/types/anime'

interface ApiResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: AnimeData;
    pagination: null | unknown;
}

interface DetailsAnimeProps {
    params: {
        slug: string;
    };
}

export default async function DetailsAnime({ params }: DetailsAnimeProps) {
    const { slug } = params;
    let animeResponse: ApiResponse | null = null;
    let error: string | null = null;

    try {
        animeResponse = await fetchAnimeBySlug(slug);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load anime data";
    }

    if (error || !animeResponse || !animeResponse.ok) {
        return (
            <DetailsAnimeSkeleton />
        );
    }

    const animeData = animeResponse.data;

    return (
        <section className='min-h-screen py-16'>
            <div className="bg-gradient-to-b from-background via-background/95 to-background/90">
                <HeroSection anime={animeData} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-10">
                            <SynopsisSection anime={animeData} />

                            <EpisodesSection anime={animeData} />

                            <RelatedAnimeSection anime={animeData} />
                        </div>

                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24">
                                <div className="space-y-8">
                                    <InfoCard anime={animeData} />

                                    <GenresSection anime={animeData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 