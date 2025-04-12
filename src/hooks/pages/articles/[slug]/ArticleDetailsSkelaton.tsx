import React from 'react'

export default function ArticleDetailsSkeleton() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16">
          {/* Main Content Skeleton */}
          <main className="lg:col-span-8">
            <div className='space-y-1'>
              {/* Article Header Skeleton */}
              <header className="space-y-4">
                <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />

                <div className="h-12 sm:h-16 md:h-20 xl:h-24 w-full bg-gray-200 rounded-lg animate-pulse" />

                {/* Author Info Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-4 sm:p-6 md:p-8 bg-card-bg/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-card-border">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 animate-pulse" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full ring-2 ring-white animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </header>

              {/* Article Content Skeleton */}
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Share Section Skeleton */}
              <div className="pt-8 sm:pt-12 border-t border-card-border">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6 sm:mb-8" />
                <div className="flex gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 sm:top-28">
              {/* Related Articles Skeleton */}
              <section className="bg-card-bg/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-card-border p-4 sm:p-6 md:p-8">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6 sm:mb-8" />
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex gap-4 sm:gap-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-card-border">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}