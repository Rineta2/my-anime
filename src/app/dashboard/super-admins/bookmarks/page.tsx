import React from 'react'

import { Metadata } from 'next'

import BookmarksLayout from '@/hooks/dashboard/super-admins/bookmarks/BookmarksLayout'

export const metadata: Metadata = {
    title: "Dashboard Bookmarks | Anime indo",
    description: "Halaman Bookmarks for super admin",
}

export default function page() {
    return (
        <BookmarksLayout />
    )
}