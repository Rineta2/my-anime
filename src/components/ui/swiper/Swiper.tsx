import React from 'react';

import { FetchBannerData } from '@/components/ui/home/lib/FetchHome';

import SwiperContent from './SwiperContent';

import SwiperSkeleton from './SwiperSkeleton';

export default async function Swiper() {
    try {
        const animeData = await FetchBannerData();
        return <SwiperContent animeData={{ data: { recent: { animeList: animeData.recent.animeList } } }} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <SwiperSkeleton />
        );
    }
}