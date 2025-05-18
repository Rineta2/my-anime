import React from 'react';

import { fetchAnimeData } from '@/components/ui/home/lib/FetchHome';

import AnimeContent from '@/components/ui/home/AnimeTerbaru';

import BannerSkeleton from '@/components/ui/home/homeSkelaton';

export default async function Anime() {
    try {
        const animeData = await fetchAnimeData();
        return <AnimeContent animeData={{ data: { recent: animeData.recent } }} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <BannerSkeleton />
        );
    }
}