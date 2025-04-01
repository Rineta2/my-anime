import React from 'react'

export default function HomeSkelaton() {
    return (
        <section className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {/* Recent Anime Section Skeleton */}
                    <div className='flex flex-col space-y-6'>
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="group bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                                    <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-200 animate-pulse"></div>
                                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3">
                                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Batch Anime Section Skeleton */}
                    <div className='flex flex-col space-y-6'>
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="group bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                                    <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-200 animate-pulse"></div>
                                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3">
                                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Movie Section Skeleton */}
                    <div className='flex flex-col space-y-6'>
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="group bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                                    <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-200 animate-pulse"></div>
                                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3">
                                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}