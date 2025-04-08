"use client"

import React, { useEffect, useState, useMemo } from 'react'

import HeroSwiper from '@/components/ui/swiper/ui/HeroSwiper'

import SwiperSkeleton from '@/components/ui/swiper/SwiperSkeleton'

import { AnimeResponse } from '@/components/ui/home/types/home'

import { getAnimeData } from '@/components/ui/home/lib/FetchHome';

export default function Swiper() {
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

    if (isLoading) return <SwiperSkeleton />;
    if (error) return <SwiperSkeleton />
    if (!memoizedData) return <SwiperSkeleton />;

    return (
        <HeroSwiper data={memoizedData} />
    )
}