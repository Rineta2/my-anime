'use client';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

import Image from 'next/image';

import Link from 'next/link';

import { AnimeResponse, Anime, Genre } from '@/components/ui/home/types/home';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSwiperProps {
    data: AnimeResponse | null;
}

export default function HeroSwiper({ data }: HeroSwiperProps) {
    if (!data) return null;

    const featuredAnime = data.data.recent.animeList.slice(0, 5);

    return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] group">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} !w-3 !h-3 !bg-white/50 !opacity-50 hover:!bg-white hover:!opacity-100 transition-all duration-300 [&.swiper-pagination-bullet-active]:!bg-white [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:!scale-125"></span>`;
                    },
                }}
                effect="fade"
                speed={800}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full [&_.swiper-slide-active_.anime-content]:translate-y-0 [&_.swiper-slide-active_.anime-content]:opacity-100 [&_.swiper-slide-active_.anime-image]:scale-110"
            >
                {featuredAnime.map((anime: Anime) => (
                    <SwiperSlide key={anime.animeId} className="group">
                        <div className="relative w-full h-full overflow-hidden">
                            {/* Background Image with Enhanced Gradient Overlay */}
                            <div className="absolute inset-0">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    fill
                                    className="anime-image object-cover scale-125 transition-transform duration-[800ms] ease-out"
                                    priority
                                    quality={90}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 sm:pb-28">
                                <div className="anime-content space-y-4 sm:space-y-6 max-w-3xl translate-y-12 opacity-0 transition-all duration-[800ms] ease-out">
                                    {/* Metadata Tags */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="px-3 sm:px-4 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-white/90 hover:bg-white/20 transition-colors">
                                            {anime.releasedOn}
                                        </span>
                                        <span className="px-3 sm:px-4 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-white/90 hover:bg-white/20 transition-colors">
                                            {anime.episodes} Episodes
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg">
                                        {anime.title}
                                    </h2>

                                    {/* Genres */}
                                    <div className="flex items-center gap-4">
                                        {anime.genres && (
                                            <div className="flex flex-wrap gap-2">
                                                {anime.genres.slice(0, 3).map((genre: Genre) => (
                                                    <span
                                                        key={genre.genreId}
                                                        className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-white/90 hover:bg-white/20 transition-colors cursor-pointer"
                                                    >
                                                        {genre.title}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href={anime.href}
                                        className="group/btn inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:translate-x-1 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                    >
                                        <span>Watch Now</span>
                                        <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <button className="swiper-button-prev !left-2 sm:!left-4 !text-white !opacity-0 group-hover:!opacity-100 transition-all duration-300 !w-8 sm:!w-12 !h-8 sm:!h-12 !bg-black/30 !backdrop-blur-sm !rounded-full hover:!bg-black/50 after:!text-base sm:after:!text-lg" />
                <button className="swiper-button-next !right-2 sm:!right-4 !text-white !opacity-0 group-hover:!opacity-100 transition-all duration-300 !w-8 sm:!w-12 !h-8 sm:!h-12 !bg-black/30 !backdrop-blur-sm !rounded-full hover:!bg-black/50 after:!text-base sm:after:!text-lg" />
            </Swiper>
        </div>
    );
} 