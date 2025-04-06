"use client"

import React, { useState, useEffect, useMemo } from 'react'

import { AnimeResponse } from '@/components/ui/home/types/home'

import AnimeMovieCard from '@/components/ui/movie/ui/AnimeMovieCard'

import SectionTitle from '@/components/ui/movie/ui/SectionTitle'

import { getAnimeData } from '@/components/ui/home/lib/FetchHome'

import MovieSkeleton from '@/components/ui/movie/MovieSkeleton'

export default function AnimeMovie() {
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
    const memoizedAnimeList = useMemo(() => memoizedData?.data.movie.animeList ?? [], [memoizedData]);

    if (isLoading) return <MovieSkeleton />
    if (error) return <MovieSkeleton />
    if (!memoizedData) return <MovieSkeleton />;

    return (
        <section className='min-h-full py-10'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
                <div className='flex flex-col space-y-6 md:space-y-10'>
                    <SectionTitle title="Movie" href={memoizedData.data.movie.href} />

                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
                        {memoizedAnimeList.map((anime, index) => (
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
