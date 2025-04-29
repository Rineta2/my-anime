import React from 'react'

import { Metadata } from 'next'

import HistoryLayout from '@/hooks/dashboard/super-admins/History/HistoryLayout'

export const metadata: Metadata = {
    title: "Dashboard History | Anime indo",
    description: "Halaman history for super admin",
}

export default function page() {
    return (
        <HistoryLayout />
    )
}