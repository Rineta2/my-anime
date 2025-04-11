'use client';

import React from 'react';

export default function SwiperSkeleton() {
    return (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] pt-16 overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
            </div>

            {/* Content Skeleton */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl space-y-3 sm:space-y-4">
                        {/* Episode Badge Skeleton */}
                        <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse"></div>

                        {/* Title Skeleton */}
                        <div className="h-12 sm:h-16 md:h-20 lg:h-24 w-3/4 bg-white/10 rounded-lg animate-pulse"></div>

                        {/* Release Date Badge Skeleton */}
                        <div className="h-6 w-32 bg-white/10 rounded-full animate-pulse"></div>

                        {/* Watch Now Button Skeleton */}
                        <div className="h-10 sm:h-12 w-32 bg-white/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 