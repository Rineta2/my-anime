import React from 'react'

import HistoryLayout from "@/hooks/dashboard/user/History/HistoryLayout"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "History | Anime Indo",
    description: "Halaman history anime yang sudah anda tonton",
}

export default function page() {
    return (
        <HistoryLayout />
    )
}
