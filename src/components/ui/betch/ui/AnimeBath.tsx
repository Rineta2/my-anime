import React from 'react'

import { AnimeResponse } from '@/components/ui/home/types/home'

import Link from 'next/link'

import { motion } from 'framer-motion'

export default function AnimeBath({ data }: { data: AnimeResponse }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='flex flex-col space-y-6 md:space-y-10'
        >
            <div className="flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Batch Anime
                </h1>

                <Link href={data?.data.batch.href} className="text-sm text-gray-300 hover:text-gray-500">
                    Lihat Semua
                </Link>
            </div>
        </motion.div>
    )
}
