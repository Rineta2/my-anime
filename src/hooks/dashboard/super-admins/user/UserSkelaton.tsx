import React from 'react'

export default function AdminSkelaton() {
    return (
        <section className="min-h-full">
            {/* Header Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-8 flex justify-between items-center">
                <div className='flex flex-col gap-1.5'>
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                </div>
                <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
            </div>

            {/* Filter Controls Skeleton */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="h-12 w-full md:w-64 bg-gray-200 animate-pulse rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
                <div className="h-12 w-full md:w-48 bg-gray-200 animate-pulse rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6">
                <div className="space-y-4">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="h-6 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                            </div>
                        ))}
                    </div>
                    {/* Table Rows */}
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4">
                            {[...Array(4)].map((_, colIndex) => (
                                <div key={colIndex} className="h-12 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-8 flex justify-center">
                <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
            </div>
        </section>
    )
}