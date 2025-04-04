import React from 'react'

interface GenreHeaderProps {
    genre: string
}

export default function GenreHeader({ genre }: GenreHeaderProps) {
    return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6">
            Anime Genre: <span className="text-[var(--primary)]/80">{genre}</span>
        </h1>
    )
} 