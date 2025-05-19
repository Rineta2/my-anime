'use client';

import React from 'react'

import { motion } from 'framer-motion'

import { InfoCardProps } from '@/hooks/pages/anime/types/anime'

export default function InfoCard({ anime }: InfoCardProps) {
    const infoItems = [
        { label: "Status", value: anime.status, icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" },
        { label: "Type", value: anime.type, icon: "M7 4v16M17 4v16M3 8h18M3 16h18M3 12h18M3 4h18M17 8h4M17 16h4M7 8H3M7 16H3" },
        { label: "Source", value: anime.source, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
        { label: "Episodes", value: anime.episodes, icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
        { label: "Duration", value: anime.duration, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { label: "Studios", value: anime.studios, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
        { label: "Producers", value: anime.producers, icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { label: "Aired", value: anime.aired, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { label: "Season", value: anime.season, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
        { label: "Censor", value: anime.censor, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
        { label: "Director", value: anime.director, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        { label: "Released On", value: anime.releasedOn, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { label: "Updated On", value: anime.updatedOn, icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }
    ];

    return (
        <motion.div
            className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-2xl font-bold text-text flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Information
            </h2>

            <div className="flex flex-wrap gap-4">
                {infoItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 group p-2 rounded-lg hover:bg-card-bg/30 transition-colors duration-300 min-w-[200px]">
                        <span className="min-w-24 text-text-secondary group-hover:text-text transition-colors duration-300 font-medium flex items-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {item.label}:
                        </span>
                        <span className="font-semibold text-primary truncate">
                            {
                                item.label === "Director" && typeof item.value === 'string' ?
                                    item.value.split(',').map((director: string, index: number) => (
                                        <span key={index} className="inline-block">
                                            {director.trim()}
                                        </span>
                                    ))
                                    : item.value || 'N/A'
                            }
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
} 