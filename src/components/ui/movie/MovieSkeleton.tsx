import React from 'react'

export default function MovieSkeleton() {
    return (
        <section className='min-h-full py-10'>
            <div className='container px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col space-y-6 md:space-y-10'>
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-48 bg-text-secondary/40 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer"></div>
                        </div>
                    </div>

                    {/* Movie Section Skeleton */}
                    <div className='flex flex-col space-y-6'>
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="group bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-200">
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
    )
} 