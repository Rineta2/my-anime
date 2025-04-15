"use client"

import React, { useState, useEffect, useMemo } from 'react'

import { getMangaData, MangaResponse } from './lib/FetchManga'

import MangaCard from './ui/MangaCard'

import SectionTitle from '@/components/ui/manga/ui/SectionTitle'

import MangaSkeleton from './MangaSkeleton'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'

import 'swiper/css/navigation'

import 'swiper/css/effect-coverflow'

export default function Manga() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<MangaResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const result = await getMangaData();
                if (isMounted) {
                    setData(result);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching data:", error);
                    setError("Failed to load manga data");
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
    const memoizedMangaList = useMemo(() => memoizedData?.data ?? [], [memoizedData]);

    if (isLoading) return <MangaSkeleton />
    if (error) return <MangaSkeleton />
    if (!memoizedData) return <MangaSkeleton />;

    return (
        <section className='min-h-full py-8 sm:py-12'>
            <div className='container px-4 sm:px-6 lg:px-8'>
                <div className='mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4'>
                    <SectionTitle title="Manga" />
                </div>
            </div>

            <div className='relative w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10'>
                <div className="group relative h-[400px]">
                    <Swiper
                        modules={[Navigation, EffectCoverflow]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        slidesPerView="auto"
                        spaceBetween={10}
                        className="mySwiper w-full"
                        speed={500}
                        effect="coverflow"
                        grabCursor={true}
                        loop={true}
                        loopAdditionalSlides={2}
                        centeredSlides={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 8
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 12
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20
                            }
                        }}
                    >
                        {memoizedMangaList.map((manga) => (
                            <SwiperSlide key={manga.param} className="w-auto">
                                <MangaCard manga={manga} />
                            </SwiperSlide>
                        ))}

                        <button className="swiper-button-prev !left-2 sm:!left-4 md:!left-8 !text-white !opacity-0 group-hover:!opacity-100 transition-all duration-300 !w-8 sm:!w-10 md:!w-12 !h-8 sm:!h-10 md:!h-12 !bg-black/30 !backdrop-blur-md !rounded-full hover:!bg-black/50 after:!text-sm sm:after:!text-base md:after:!text-lg" />
                        <button className="swiper-button-next !right-2 sm:!right-4 md:!right-8 !text-white !opacity-0 group-hover:!opacity-100 transition-all duration-300 !w-8 sm:!w-10 md:!w-12 !h-8 sm:!h-10 md:!h-12 !bg-black/30 !backdrop-blur-md !rounded-full hover:!bg-black/50 after:!text-sm sm:after:!text-base md:after:!text-lg" />
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
