import React from 'react'

export default function DaftarKomikSkeleton() {
    return (
        <section className='min-h-screen py-24 sm:py-28'>
            <div className="container px-4 md:px-6">
                {/* Breadcrumbs and Search Section */}
                <div className="flex flex-col space-y-6 md:space-y-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        {/* Breadcrumbs Skeleton */}
                        <div className="breadcrumbs text-sm md:text-base">
                            <ul className="flex items-center gap-2 flex-wrap">
                                <li>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Page Info and Search Bar Skeleton */}
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center space-x-2 text-sm md:text-base bg-card-bg/80 backdrop-blur-md px-4 py-2 rounded-full border border-card-border/50 shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
                                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div className="w-full sm:w-auto">
                                <div className="h-10 w-full sm:w-64 bg-gray-200 animate-pulse rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Manga Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5 mt-5 sm:mt-6 md:mt-8">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="bg-card-bg rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-card-border">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-3">
                                <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}