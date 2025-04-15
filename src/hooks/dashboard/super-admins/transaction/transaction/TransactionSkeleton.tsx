import React from 'react'

export default function TransactionSkeleton() {
  return (
    <section className='min-h-screen'>
      {/* Header Section */}
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg border border-[var(--border-color)] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div className="space-y-3">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-5 w-64 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Transaction Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] hover:shadow-lg transition-all duration-300">
            {/* Header with User Info and Status */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded-full bg-gray-200 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-3 w-24 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Package and Payment Info */}
            <div className="space-y-4">
              <div className="bg-[var(--hover-bg)] p-4 rounded-lg">
                <div className="h-5 w-40 bg-gray-200 animate-pulse rounded-lg mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--hover-bg)] rounded-lg">
                <div className="relative w-10 h-10">
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-3 w-16 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-[var(--hover-bg)] p-3 rounded-lg">
                  <div className="h-3 w-20 bg-gray-200 animate-pulse rounded-lg mb-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="bg-[var(--hover-bg)] p-3 rounded-lg">
                  <div className="h-3 w-20 bg-gray-200 animate-pulse rounded-lg mb-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
                <div className="h-10 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 