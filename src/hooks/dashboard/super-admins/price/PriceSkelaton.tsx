import React from 'react'

export default function PriceSkelaton() {
    return (
        <section className='min-h-screen'>
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div className="space-y-3">
                    <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg" />
                    <div className="h-6 w-64 bg-gray-200 animate-pulse rounded-lg" />
                </div>
                <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-xl" />
            </div>

            {/* Price Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl border border-gray-200 p-6"
                    >
                        <div className="space-y-6">
                            {/* Title and Label Section */}
                            <div className="flex flex-col justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <div className="h-7 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
                                    <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-lg" />
                                    <div className="h-5 w-24 bg-gray-200 animate-pulse rounded-lg mt-1" />
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="space-y-3">
                                <div className="h-5 w-24 bg-gray-200 animate-pulse rounded-lg" />
                                <ul className="space-y-3">
                                    {[...Array(3)].map((_, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="h-2 w-2 rounded-full bg-gray-200 animate-pulse" />
                                            <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Payment Methods Section */}
                            <div className="space-y-3">
                                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded-lg" />
                                <div className="flex flex-wrap gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg" />
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6 border-t border-gray-100">
                                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-xl" />
                                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}