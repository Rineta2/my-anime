import React from 'react'

export default function ArticlesSkeleton() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-8">
        {/* Category Filters Skeleton */}
        <div className="flex gap-4 mb-8">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-10 w-24 bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>

        {/* Top Article Skeleton */}
        <div className="mb-12">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="w-full h-[150px] md:h-[350px] bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="flex flex-col gap-6">
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-8 w-full bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-16 w-full bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm rounded-md">
              <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-6 w-full bg-gray-200 animate-pulse rounded mb-3"></div>
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded mb-6"></div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}