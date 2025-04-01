import React from 'react'

import EpisodePage from "@/components/ui/home/ui/anime/pages/episode/DetailsEpisode"

import { Metadata, ResolvingMetadata } from "next"

import axios from "axios"

type Props = {
    params: Promise<{ slug: string }>
}

async function getEpisodeData(slug: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/api/episode/${slug}`,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching episode data:", error);
        return null;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    // fetch data
    const episodeData = await getEpisodeData(slug);
    const episode = episodeData?.data;

    if (!episode) {
        return {
            title: "Episode Not Found",
            description: "The requested episode could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${episode.title} | My Anime`,
        description: episode.synopsis?.paragraphs?.[0] || `Watch ${episode.title} online.`,
        openGraph: {
            title: `${episode.title} | My Anime`,
            description: episode.synopsis?.paragraphs?.[0] || `Watch ${episode.title} online.`,
            images: [episode.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${episode.title} | My Anime`,
            description: episode.synopsis?.paragraphs?.[0] || `Watch ${episode.title} online.`,
            images: [episode.poster],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return (
        <EpisodePage params={{ slug }} />
    )
}
