import React from 'react'

export default function JadwalRilisSkeleton() {
    return (
        <section className='min-h-screen py-24 bg-gradient-to-br from-background via-background/95 to-background/90'>
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4 order-last lg:order-first">
                        <div className="grid gap-8">
                            {[...Array(3)].map((_, dayIndex) => (
                                <div key={dayIndex} className="bg-card-bg/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-card-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-primary/5">
                                    <h2 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></span>
                                        <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
                                    </h2>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                        {[...Array(8)].map((_, index) => (
                                            <div key={index} className="group bg-hover-bg/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-card-border/50 hover:border-primary/30 hover:scale-[1.02]">
                                                <div className="relative h-48 xs:h-52 sm:h-64 overflow-hidden">
                                                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                                </div>
                                                <div className="p-3 sm:p-5">
                                                    <div className="h-5 sm:h-6 bg-gray-200 animate-pulse mb-2 sm:mb-3 rounded-lg"></div>
                                                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                                                        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                                                        <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                                                    </div>
                                                    <div className="h-4 w-full bg-gray-200 animate-pulse mb-3 sm:mb-4 rounded-lg"></div>

                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                                                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
                                                        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-card-bg/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 h-fit lg:sticky lg:top-24 border border-card-border/50 hover:border-primary/30 transition-all duration-300">
                            <div>
                                <h3 className="text-lg font-semibold mb-6 text-text flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></span>
                                    <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
                                </h3>
                                <nav>
                                    <ul className="space-y-2">
                                        {[...Array(7)].map((_, index) => (
                                            <li key={index}>
                                                <div className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 bg-hover-bg/50 border border-card-border/50">
                                                    <div className="flex justify-between items-center">
                                                        <div className="h-6 w-28 bg-gray-200 animate-pulse rounded-lg"></div>
                                                        {index === 2 && (
                                                            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}