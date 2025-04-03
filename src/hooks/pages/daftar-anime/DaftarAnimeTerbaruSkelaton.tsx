import React from 'react'

export default function AnimeTerbaruSkeleton() {
    return (
        <section className="min-h-screen py-24 bg-[var(--background)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Schedule Section Skeleton */}
                        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
                            <div className="h-12 bg-gray-200 animate-pulse mb-6 px-6 pt-6"></div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="group bg-[var(--card-bg)] rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[var(--card-border)]">
                                            <div className="h-[200px] bg-gray-200 animate-pulse"></div>
                                            <div className="p-4">
                                                <div className="h-6 bg-gray-200 animate-pulse mb-2"></div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                                    <div className="h-4 w-12 bg-gray-200 animate-pulse"></div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                                </div>
                                                <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Ongoing Section Skeleton */}
                        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
                            <div className="h-12 bg-gray-200 animate-pulse mb-6 px-6 pt-6"></div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="group bg-[var(--card-bg)] rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[var(--card-border)]">
                                            <div className="h-[300px] bg-gray-200 animate-pulse"></div>
                                            <div className="p-4">
                                                <div className="h-6 bg-gray-200 animate-pulse mb-2"></div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                                    <div className="h-4 w-12 bg-gray-200 animate-pulse"></div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                                </div>
                                                <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Section Skeleton */}
                        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
                            <div className="h-12 bg-gray-200 animate-pulse mb-6 px-6 pt-6"></div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="group bg-[var(--card-bg)] rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[var(--card-border)]">
                                            <div className="h-[150px] sm:h-[200px] bg-gray-200 animate-pulse"></div>
                                            <div className="p-4">
                                                <div className="h-6 bg-gray-200 animate-pulse mb-2"></div>
                                                <div className="flex items-center justify-between mb-2 flex-col sm:flex-row">
                                                    <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                                                    <div className="h-4 w-20 bg-gray-200 animate-pulse"></div>
                                                </div>
                                                <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sticky top-24 overflow-y-auto max-h-[calc(100vh-10rem)] transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
                            <div className="h-12 bg-gray-200 animate-pulse mb-8"></div>

                            {/* Genres Section Skeleton */}
                            <div className="mb-8">
                                <div className="h-8 bg-gray-200 animate-pulse mb-4"></div>
                                <div className="flex flex-wrap gap-2">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="h-8 w-20 bg-gray-200 animate-pulse rounded-lg"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Schedule Section Skeleton */}
                            <div className="mb-8">
                                <div className="h-8 bg-gray-200 animate-pulse mb-4"></div>
                                <div className="flex flex-wrap gap-2">
                                    {[...Array(7)].map((_, index) => (
                                        <div key={index} className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Status Section Skeleton */}
                            <div className="mb-8">
                                <div className="h-8 bg-gray-200 animate-pulse mb-4"></div>
                                <div className="flex flex-wrap gap-2">
                                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
                                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
                                </div>
                            </div>

                            {/* Type Section Skeleton */}
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <div className="h-8 bg-gray-200 animate-pulse mb-4"></div>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
                                        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-lg"></div>
                                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}