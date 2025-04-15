import React from 'react'

export default function MangaSkeleton() {
    return (
        <section className='min-h-full py-6 sm:py-8 md:py-10'>
            <div className='px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 container'>
                <div className='mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4'>
                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>

            <div className='relative w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10'>
                <div className="group relative h-[400px]">
                    <div className="mySwiper w-full">
                        <div className="flex gap-4 overflow-hidden">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="w-[200px] flex-shrink-0">
                                    <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-gray-200 animate-pulse"></div>
                                    <div className="mt-4 space-y-1 px-1">
                                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="swiper-button-prev !left-2 sm:!left-4 md:!left-8 !text-white !opacity-0 group-hover:!opacity-100 transition-all duration-300 !w-8 sm:!w-10 md:!w-12 !h-8 sm:!h-10 md:!h-12 !bg-black/30 !backdrop-blur-md !rounded-full hover:!bg-black/50 after:!text-sm sm:after:!text-base md:after:!text-lg"></button>
                    <button className="swiper-button-next !right-2 sm:!right-4 md:!right-8 !text-white !opacity-0 group-hover:!opacity-100 transition-all duration-300 !w-8 sm:!w-10 md:!w-12 !h-8 sm:!h-10 md:!h-12 !bg-black/30 !backdrop-blur-md !rounded-full hover:!bg-black/50 after:!text-sm sm:after:!text-base md:after:!text-lg"></button>
                </div>
            </div>
        </section>
    )
} 