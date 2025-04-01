import React from 'react'
import { AnimeResponse } from '@/components/ui/home/types/home'
import BatchList from './batch/BatchList'

export default function AnimeBath({ data }: { data: AnimeResponse }) {
    return (
        <div className='flex flex-col space-y-8'>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Batch Anime
                </h1>
            </div>
            <BatchList batchList={data?.data.batch.batchList} />
        </div>
    )
}
