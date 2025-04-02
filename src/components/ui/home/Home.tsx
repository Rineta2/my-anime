'use client';

import React, { useEffect, useState } from 'react'

import { getAnimeData } from "@/components/ui/home/lib/FetchHome"

import HomeSkeleton from '@/components/ui/home/homeSkelaton'

import { AnimeResponse } from "@/components/ui/home/types/home";

import AnimeTerbaru from '@/components/ui/home/ui/AnimeTerbaru'

export default function Home() {
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
        return <HomeSkeleton />
    }

    if (!data) {
        return null;
    }

    return (
        <section className="min-h-screen py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-16 sm:space-y-20 md:space-y-24">
                    <AnimeTerbaru data={data} />
                </div>
            </div>
        </section>
    )
}