'use client';

import { AnimeResponse } from '@/components/ui/home/types/home';

import HeroSwiper from '@/components/ui/swiper/ui/HeroSwiper'

interface BannerContentProps {
    animeData: AnimeResponse;
}

export default function BannerContent({ animeData }: BannerContentProps) {
    return (
        <HeroSwiper data={animeData} />
    );
} 