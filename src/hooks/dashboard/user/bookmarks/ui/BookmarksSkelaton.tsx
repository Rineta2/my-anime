import React from 'react'

export default function HistorySkelaton() {
    return (
        <section className="min-h-full">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg relative">
                        <div className="relative h-48 md:h-56">
                            <div className="absolute inset-0 bg-gray-200 animate-pulse">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                            </div>
                        </div>

                        <div className="p-4 md:p-5">
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded-lg mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                            </div>
                            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}