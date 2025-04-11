import React from 'react'

import BookmarksLayout from "@/hooks/dashboard/user/bookmarks/BookmarksLayout"

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Bookmarks | Anime Indo",
  description: "Halaman bookmarks anime",
}

export default function page() {
  return (
    <BookmarksLayout />
  )
}
