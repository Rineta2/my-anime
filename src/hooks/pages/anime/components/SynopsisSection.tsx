import React from 'react'

import { motion } from 'framer-motion'

import { SynopsisSectionProps } from '@/hooks/pages/anime/types/anime'

export default function SynopsisSection({ anime }: SynopsisSectionProps) {
    if (!anime.synopsis || anime.synopsis.paragraphs.length === 0) {
        return null;
    }

    return (
        <motion.div
            className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
                Synopsis
            </h2>
            <div className="space-y-4 text-text-secondary text-base md:text-lg leading-relaxed">
                {anime.synopsis.paragraphs.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </motion.div>
    )
} 