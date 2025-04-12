import React from 'react'

export default function ArticleSkelaton() {
    return (
        <section className="min-h-full px-4 sm:px-8 py-10">
            <div className="container">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-8">
                    <div className="h-12 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Top Articles Skeleton */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="group bg-background/60 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-border-color/50">
                            <div className="relative h-48 xs:h-52 sm:h-56 md:h-64 lg:h-72 bg-gray-200 animate-pulse">
                                <div className='absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-300 w-fit'>
                                    <div className="h-4 w-20 bg-gray-400 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="px-4 py-4 flex flex-col gap-2 sm:gap-3 md:gap-4">
                                <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Other Articles Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="group bg-background/60 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-border-color/50">
                            <div className="relative h-48 xs:h-52 sm:h-56 md:h-64 lg:h-72 bg-gray-200 animate-pulse">
                                <div className='absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-300 w-fit'>
                                    <div className="h-4 w-20 bg-gray-400 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="px-4 py-4 flex flex-col gap-2 sm:gap-3 md:gap-4">
                                <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}