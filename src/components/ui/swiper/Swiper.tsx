"use client"

import React, { useEffect, useState } from 'react'

import HeroSwiper from '@/components/ui/swiper/ui/HeroSwiper'

import SwiperSkeleton from '@/components/ui/swiper/SwiperSkeleton'

import { AnimeResponse } from '@/components/ui/home/types/home'

import { getAnimeData } from '@/components/ui/home/lib/FetchHome';

export default function Swiper() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<AnimeResponse | null>(null);

    useEffect(() => {
        const fetchData = () => {
            getAnimeData()
                .then(result => {
                    setData(result);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <SwiperSkeleton />;
    }

    return (
        <div className="pt-16 sm:pt-20">
            <HeroSwiper data={data} />
        </div>
    )
}
