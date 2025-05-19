import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

import { HomeResponse } from '../home/types/home'

interface SidebarProps {
    animeData: HomeResponse
}

type ScheduleType = 'allTime' | 'monthly' | 'weekly'

export default function Sidebar({ animeData }: SidebarProps) {
    const [activeFilter, setActiveFilter] = useState<ScheduleType>('allTime')

    const getScheduleData = () => {
        switch (activeFilter) {
            case 'allTime':
                return animeData.data.schedule.allTime.animeList
            case 'monthly':
                return animeData.data.schedule.monthly.animeList
            case 'weekly':
                return animeData.data.schedule.weekly.animeList
            default:
                return animeData.data.schedule.allTime.animeList
        }
    }

    return (
        <aside className='w-full xl:w-1/4'>
            <div className='sticky top-24'>
                <div className='flex flex-col gap-6 bg-[var(--card-bg)] p-6 rounded-xl shadow-lg min-h-[400px] sm:min-h-[500px] max-h-[80vh] overflow-y-auto'>
                    <div className='flex justify-between items-center gap-2 border-b border-[var(--card-border)] pb-4'>
                        <h3 className='text-xl font-bold text-[var(--text)]'>Schedule</h3>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => setActiveFilter('allTime')}
                                className={`px-3 py-1 text-sm rounded ${activeFilter === 'allTime'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                All Time
                            </button>
                            <button
                                onClick={() => setActiveFilter('monthly')}
                                className={`px-3 py-1 text-sm rounded ${activeFilter === 'monthly'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setActiveFilter('weekly')}
                                className={`px-3 py-1 text-sm rounded ${activeFilter === 'weekly'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                Weekly
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row xl:flex-col gap-4 sm:gap-6 overflow-x-auto xl:overflow-x-visible pb-2 custom-scrollbar px-2 sm:px-0'>
                        {getScheduleData().map((anime) => (
                            <Link
                                href={anime.href}
                                key={anime.animeId}
                                className='w-40 sm:w-44 xl:w-auto min-w-[160px] sm:min-w-[176px] xl:min-w-0 group flex-shrink-0 xl:flex-shrink'
                            >
                                <div className='flex flex-col xl:flex-row bg-[var(--card-bg)] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-[var(--card-border)] hover:border-[var(--primary)]'>
                                    <div className='relative w-full aspect-[3/4] xl:w-32 xl:aspect-[3/4] flex-shrink-0'>
                                        <Image
                                            src={anime.poster}
                                            alt={anime.title}
                                            fill
                                            className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                                            sizes="(max-width: 1279px) 160px, 128px"
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                    </div>
                                    <div className='flex flex-col gap-2 p-4 flex-1'>
                                        <h5 className='text-sm font-semibold text-[var(--text)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-200'>
                                            {anime.title}
                                        </h5>
                                        {anime.genres && (
                                            <div className='flex flex-wrap gap-1.5'>
                                                {anime.genres.slice(0, 2).map((genre, index) => (
                                                    <span
                                                        key={index}
                                                        className='text-xs px-2 py-0.5 rounded-full bg-[var(--hover-bg)] text-[var(--text-secondary)]'
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {anime.rating && (
                                            <div className='flex items-center gap-1.5 mt-auto'>
                                                <Star className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
                                                <span className='text-sm font-medium text-[var(--text-secondary)]'>
                                                    {anime.rating}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}
