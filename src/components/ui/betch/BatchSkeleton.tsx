import React from 'react'

export default function BatchSkeleton() {
    return (
        <section className='min-h-full'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Batch Header Skeleton */}
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-48 bg-text-secondary/20 rounded-lg animate-pulse"></div>

                        <div className="h-8 w-48 bg-text-secondary/20 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-10 bg-text-secondary/20 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col space-y-6'>
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="group bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-border-color/30">
                                <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-200 animate-pulse"></div>
                                <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3">
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
        </section>
    )
} 