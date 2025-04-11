"use client"

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { getUserBookmarks } from '@/hooks/dashboard/user/bookmarks/utils/getUserBookmarks';

import Image from 'next/image';

import Link from 'next/link';

import Pagination from '@/base/helper/Pagination';

import LengthHistory from "@/hooks/dashboard/user/bookmarks/ui/LengthBookmarks"

import HistorySkelaton from "@/hooks/dashboard/user/bookmarks/ui/BookmarksSkelaton"

interface ViewHistory {
    title: string;
    poster: string;
    timestamp: number;
    href: string;
}

export default function BookmarksLayout() {
    const { user } = useAuth();
    const [history, setHistory] = useState<ViewHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        if (!user) return;

        const cleanup = getUserBookmarks(user.uid, (bookmarksData) => {
            setHistory(bookmarksData);
            setLoading(false);
        });

        return () => {
            cleanup();
        };
    }, [user]);

    const totalPages = Math.ceil(history.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHistory = history.slice(startIndex, endIndex);

    if (loading) {
        return (
            <HistorySkelaton />
        );
    }

    if (!loading && history.length === 0) {
        return (
            <LengthHistory />
        );
    }

    return (
        <section className="min-h-screen">
            <div className="bg-[var(--card-bg)] backdrop-blur-lg rounded-3xl p-6 shadow-[var(--card-shadow)] mb-10">
                <h1 className="text-2xl font-bold text-[var(--text)]">
                    Bookmarks
                </h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentHistory.map((item, index) => (
                    <Link href={item.href} key={index} className="block group">
                        <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                            <div className="relative h-48 md:h-56">
                                <Image
                                    src={item.poster}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg md:text-xl mb-2 line-clamp-1 sm:line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {new Date(item.timestamp).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </section>
    );
}
