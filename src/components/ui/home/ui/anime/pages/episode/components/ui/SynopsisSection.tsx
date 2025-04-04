import React from 'react';

import { motion } from 'framer-motion';

import { SynopsisSectionProps } from '@/components/ui/home/ui/anime/pages/episode/types/types';

export default function SynopsisSection({ episode }: SynopsisSectionProps) {
    if (!episode.synopsis || !episode.synopsis.paragraphs || episode.synopsis.paragraphs.length === 0) {
        return null;
    }

    return (
        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg">
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
                Synopsis
            </h2>
            <motion.div
                className="space-y-4 text-text-secondary text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {episode.synopsis.paragraphs.map((paragraph: string, index: number) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        {paragraph}
                    </motion.p>
                ))}
            </motion.div>
        </div>
    );
} 