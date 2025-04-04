import React from 'react';
import { motion } from 'framer-motion';
import { Episode, FormatItem, QualityItem, UrlItem } from '@/components/ui/home/ui/anime/pages/episode/types/types';

interface DownloadSectionProps {
    episode: Episode;
}

export default function DownloadSection({ episode }: DownloadSectionProps) {
    if (!episode.downloadUrl || !episode.downloadUrl.formats || episode.downloadUrl.formats.length === 0) {
        return null;
    }

    return (
        <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-8">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Options
            </h2>
            <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {episode.downloadUrl.formats.map((format: FormatItem, index: number) => (
                    <motion.div
                        key={format.title}
                        className="bg-card-bg/30 rounded-xl p-5 border border-card-border/50"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className="text-lg font-semibold text-accent flex items-center gap-2 mb-5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                            </svg>
                            {format.title}
                        </h3>
                        <div className="space-y-6">
                            {format.qualities.map((quality: QualityItem, qIndex: number) => (
                                <motion.div
                                    key={quality.title}
                                    className="space-y-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: qIndex * 0.05 }}
                                >
                                    <h4 className="text-base font-medium text-text-secondary flex items-center gap-2">
                                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {quality.title}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {quality.urls.map((url: UrlItem, urlIndex: number) => (
                                            <motion.a
                                                key={url.title}
                                                href={url.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2.5 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium border border-accent/20 hover:border-accent/40"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: urlIndex * 0.05 }}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                                </svg>
                                                {url.title}
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
} 