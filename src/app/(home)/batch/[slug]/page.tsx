import React from 'react'

import BatchPage from "@/components/ui/betch/pages/DetailsBatch"

import { Metadata, ResolvingMetadata } from "next"

import axios from "axios"

type Props = {
    params: Promise<{ slug: string }>
}

async function getBatchData(slug: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/api/batch/${slug}`,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching batch data:", error);
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
    const batchData = await getBatchData(slug);
    const batch = batchData?.data;

    if (!batch) {
        return {
            title: "Batch Not Found",
            description: "The requested batch could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${batch.title} | My Anime`,
        description: `Watch ${batch.title} batch episodes online.`,
        openGraph: {
            title: `${batch.title} | My Anime`,
            description: `Watch ${batch.title} batch episodes online.`,
            images: [batch.thumbnail, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${batch.title} | My Anime`,
            description: `Watch ${batch.title} batch episodes online.`,
            images: [batch.thumbnail],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return (
        <BatchPage params={{ slug }} />
    )
}
