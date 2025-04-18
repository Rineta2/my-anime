"use client"

import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'

import 'swiper/css'

import 'swiper/css/navigation'

import 'swiper/css/pagination'

import 'swiper/css/effect-fade'

import SwiperSkeleton from '@/hooks/pages/anime-terbaru/swiper/SwiperSkeleton'

import SlideContent from '@/hooks/pages/anime-terbaru/swiper/ui/SlideContent'

import { useAnimeRecent } from '@/hooks/pages/anime-terbaru/swiper/utils/useAnimeRecent'

export default function HeroSlider() {
    const { data, isLoading } = useAnimeRecent()

    const animeList = data?.data.animeList ?? []
    const featuredAnime = animeList.slice(0, 5)

    if (isLoading) return <SwiperSkeleton />

    if (!featuredAnime.length) return null

    return (
        <div className="relative w-full h-[80vh] sm:h-[100vh] group">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                navigation
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className} !w-2 !h-2"></span>`;
                    },
                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                speed={1000}
                className="w-full h-full [&_.swiper-button-next]:w-8 sm:[&_.swiper-button-next]:w-10 [&_.swiper-button-next]:h-8 sm:[&_.swiper-button-next]:h-10 [&_.swiper-button-prev]:w-8 sm:[&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:h-8 sm:[&_.swiper-button-prev]:h-10 [&_.swiper-button-next]:bg-black/60 [&_.swiper-button-prev]:bg-black/60 [&_.swiper-button-next]:backdrop-blur-md [&_.swiper-button-prev]:backdrop-blur-md [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:hover:bg-black/80 [&_.swiper-button-prev]:hover:bg-black/80 [&_.swiper-button-next]:transition-all [&_.swiper-button-prev]:transition-all [&_.swiper-button-next]:duration-300 [&_.swiper-button-prev]:duration-300 [&_.swiper-button-next]:shadow-lg [&_.swiper-button-prev]:shadow-lg [&_.swiper-button-next]:hover:scale-110 [&_.swiper-button-prev]:hover:scale-110 [&_.swiper-button-next::after]:!text-sm [&_.swiper-button-prev::after]:!text-sm [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:bg-white/30 [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination-bullet-active]:!w-3 [&_.swiper-pagination-bullet-active]:ring-1 [&_.swiper-pagination-bullet-active]:ring-primary/50 [&_.swiper-pagination-bullet-active]:ring-offset-1 [&_.swiper-pagination-bullet-active]:ring-offset-black/50 [&_.swiper-button-next]:opacity-0 [&_.swiper-button-prev]:opacity-0 [&_.swiper-button-next]:translate-x-4 [&_.swiper-button-prev]:-translate-x-4 group-hover:[&_.swiper-button-next]:opacity-100 group-hover:[&_.swiper-button-prev]:opacity-100 group-hover:[&_.swiper-button-next]:translate-x-0 group-hover:[&_.swiper-button-prev]:translate-x-0 [&_.swiper-slide]:transition-all [&_.swiper-slide]:duration-1000 [&_.swiper-slide-active]:scale-105 [&_.swiper-slide-active]:opacity-100 [&_.swiper-slide]:opacity-50 [&_.swiper-slide-active]:animate-slide-in [&_.swiper-slide]:animate-slide-out"
            >
                {featuredAnime.map((anime) => (
                    <SwiperSlide key={anime.animeId}>
                        <SlideContent anime={anime} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
} 