"use client"

import React, { useState, useEffect } from 'react'

import { AnimeResponse } from '@/components/ui/home/types/home'

import AnimeMovieCard from '@/components/ui/movie/ui/AnimeMovieCard'

import SectionTitle from '@/components/ui/movie/ui/SectionTitle'

import { getAnimeData } from '@/components/ui/home/lib/FetchHome'

import MovieSkeleton from '@/components/ui/movie/MovieSkeleton'

export default function AnimeMovie() {
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
        return <MovieSkeleton />
    }

    if (!data) {
        return null;
    }

    return (
        <section className='min-h-full py-10'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
                <div className='flex flex-col space-y-6 md:space-y-10'>
                    <SectionTitle title="Movie" href={data?.data.movie.href} />

                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
                        {data?.data.movie.animeList.map((anime, index) => (
                            <AnimeMovieCard
                                key={`${anime.animeId}-${index}`}
                                anime={anime}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
