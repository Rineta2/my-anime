'use client';

import React, { useEffect, useState, useMemo } from 'react'

import { getAnimeData } from "@/components/ui/home/lib/FetchHome"

import HomeSkeleton from '@/components/ui/home/homeSkelaton'

import { AnimeResponse } from "@/components/ui/home/types/home";

import AnimeTerbaru from '@/components/ui/home/ui/AnimeTerbaru'

export default function Home() {
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

    const memoizedData = useMemo(() => data, [data]);

    if (isLoading) return <HomeSkeleton />
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>
    if (!memoizedData) return <HomeSkeleton />;

    return (
        <section className="min-h-screen py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-16 sm:space-y-20 md:space-y-24">
                    <AnimeTerbaru data={memoizedData} />
                </div>
            </div>
        </section>
    )
}