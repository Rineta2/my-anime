import React from 'react'

export default function AnimeTerbaruSkeleton() {
    return (
        <section className='min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 py-12 md:py-24'>
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 space-y-4 md:space-y-0">
                    <div className="relative">
                        <div className="h-12 md:h-14 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm md:text-base bg-card-bg/50 backdrop-blur-sm px-4 py-2 rounded-full border border-card-border">
                        <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {[...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className="card bg-card-bg border border-card-border shadow-lg rounded-xl overflow-hidden"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animationFillMode: 'both'
                            }}
                        >
                            <div className="relative h-48 md:h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <div className="flex flex-wrap gap-2">
                                        <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-3 md:p-4">
                                <div className="h-6 md:h-7 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="card-actions justify-end mt-2">
                                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 md:mt-12">
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}