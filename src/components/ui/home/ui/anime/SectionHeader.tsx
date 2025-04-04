import Link from 'next/link'

import React from 'react'

interface SectionHeaderProps {
    title: string
    href: string
}

export default function SectionHeader({ title, href }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {title}
            </h1>

            <Link href={href} className="text-sm text-gray-300 hover:text-gray-500">
                Lihat Semua
            </Link>
        </div>
    )
} 