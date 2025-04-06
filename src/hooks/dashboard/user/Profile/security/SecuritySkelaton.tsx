import React from 'react'

export default function ProfileSkelaton() {
    return (
        <section className="min-h-full">
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                    <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--card-bg)] rounded-3xl shadow-lg border border-[var(--border-color)] backdrop-blur-xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Profile Image Skeleton */}
                    <div className="flex flex-col items-center space-y-8 order-1 lg:order-2">
                        <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                    </div>

                    {/* Form Fields Skeleton */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="space-y-6">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)]">
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-lg mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                    </div>
                                    <div className="h-8 w-full bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
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