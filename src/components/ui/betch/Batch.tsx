"use client"

import React, { useState, useEffect, useMemo } from 'react'

import { AnimeResponse } from '@/components/ui/home/types/home'

import AnimeCard from '@/components/ui/betch/ui/AnimeCard'

import { getAnimeData } from "@/components/ui/home/lib/FetchHome"

import BatchSkeleton from '@/components/ui/betch/BatchSkeleton'

import AnimeBath from '@/components/ui/betch/ui/AnimeBath'

export default function BatchList() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<AnimeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const result = await getAnimeData();
                if (isMounted) {
                    setData(result);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching data:", error);
                    setError("Failed to load anime data");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const batchList = useMemo(() => data?.data.batch.batchList ?? [], [data]);

    if (isLoading) return <BatchSkeleton />
    if (error) return <BatchSkeleton />
    if (!data) return <BatchSkeleton />;

    return (
        <section className='min-h-full'>
            <div className="container px-4 sm:px-6 lg:px-8 space-y-10">
                <AnimeBath data={data} />
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                    {batchList.map((anime: AnimeResponse['data']['batch']['batchList'][0], index: number) => (
                        <AnimeCard
                            key={`${anime.animeId}-${index}`}
                            anime={anime}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
} 