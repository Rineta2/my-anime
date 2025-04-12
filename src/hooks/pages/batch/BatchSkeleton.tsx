import React from 'react'

export default function BatchSkeleton() {
  return (
    <section className='min-h-screen sm:py-20'>
      <div className="container px-4 md:px-8">
        <div className="flex flex-col space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="breadcrumbs text-sm md:text-base">
              <ul className="flex items-center gap-2 flex-wrap">
                <li>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2 text-sm md:text-base bg-card-bg/80 backdrop-blur-md px-4 py-2 rounded-full border border-card-border/50">
                <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full sm:w-auto">
                <div className="h-10 w-full sm:w-64 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5 mt-5 sm:mt-6 md:mt-8">
          {[...Array(10)].map((_, index) => (
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

        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-12">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}