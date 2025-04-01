'use client';

import React, { useEffect, useState } from 'react'

import { getAnimeData } from "@/components/ui/home/lib/FetchHome"

import HomeSkeleton from '@/components/ui/home/homeSkelaton'

import { AnimeResponse } from "@/components/ui/home/types/home";

import AnimeTerbaru from '@/components/ui/home/ui/AnimeTerbaru'

import AnimeBath from '@/components/ui/home/ui/AnimeBath'

import AnimeMovie from '@/components/ui/home/ui/AnimeMovie'

export default function Home() {
    const [data, setData] = useState<AnimeResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnimeData();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <HomeSkeleton />
    }

    return (
        <section className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-16 sm:space-y-20 md:space-y-24">
                    {data && <AnimeTerbaru data={data} />}

                    {data && <AnimeBath data={data} />}

                    {data && <AnimeMovie data={data} />}
                </div>
            </div>
        </section>
    )
}