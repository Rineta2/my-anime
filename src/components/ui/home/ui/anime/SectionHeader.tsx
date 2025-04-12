import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'

interface SectionHeaderProps {
    title: string
    href: string
}

export default function SectionHeader({ title, href }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
        >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-gradient">
                {title}
            </h1>

            <Link href={href} className="text-sm text-gray-300 hover:text-gray-500">
                Lihat Semua
            </Link>
        </motion.div>
    )
} 