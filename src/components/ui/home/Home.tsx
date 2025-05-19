import React from 'react';

import { fetchAnimeData } from '@/components/ui/home/lib/FetchHome';

import AnimeContent from '@/components/ui/home/AnimeTerbaru';

import BannerSkeleton from '@/components/ui/home/homeSkelaton';

import { HomeResponse } from '@/components/ui/home/types/home';

export default async function Anime() {
    try {
        const animeData = await fetchAnimeData();
        const response: HomeResponse = {
            statusCode: 200,
            statusMessage: "OK",
            message: "",
            ok: true,
            data: {
                recent: {
                    href: "/samehadaku/recent",
                    animeList: animeData.recent.animeList
                },
                schedule: animeData.schedule
            },
            pagination: null
        };
        return <AnimeContent animeData={response} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <BannerSkeleton />
        );
    }
}