import React from 'react'

import { notFound } from 'next/navigation'

import GenrePageClient from '@/hooks/pages/genres/GenrePageClient'

import { Metadata, ResolvingMetadata } from 'next'

import { ApiResponse } from '@/hooks/pages/types/Genre'

type Props = {
    params: Promise<{ genres: string }>
    searchParams: Promise<{ page?: string }>
}

async function getAnimeByGenre(genre: string, page: number = 1) {
    const baseUrl = process.env.NEXT_PUBLIC_URL as string;
    const res = await fetch(`${baseUrl}/api/anime/genres/${genre}?page=${page}`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        throw new Error(`Failed to fetch data: ${res.status}`);
    }

    return res.json();
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { genres } = await params;
    const formattedGenre = genres.charAt(0).toUpperCase() + genres.slice(1);
    const title = `${formattedGenre} Anime | My Anime`;
    const description = `Browse and watch ${genres} anime online. Find the best ${genres} anime series and movies.`;
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function Page({ params, searchParams }: Props) {
    const { genres } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    try {
        const animeData: ApiResponse = await getAnimeByGenre(genres, currentPage);
        const { animeList } = animeData.data;
        const { currentPage: pageNum, totalPages } = animeData.pagination;

        return (
            <GenrePageClient
                genres={genres}
                animeList={animeList}
                currentPage={pageNum}
                totalPages={totalPages}
            />
        )
    } catch (error) {
        console.error('Error fetching anime data:', error);
        notFound();
    }
}
