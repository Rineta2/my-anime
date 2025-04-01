import React from 'react'

interface SectionTitleProps {
    title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
    return (
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-gradient">
            {title}
        </h1>
    )
} 