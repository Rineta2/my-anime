import React from 'react'

interface SectionHeaderProps {
    title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {title}
            </h1>
        </div>
    )
} 