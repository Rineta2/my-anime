import React from 'react'

import { Metadata } from 'next'

import UserLayout from '@/hooks/dashboard/user/UserLayout'

export const metadata: Metadata = {
    title: "Dashboard User | Anime Indo",
    description: "Halaman dashboard for user",
}

export default function page() {
    return (
        <UserLayout />
    )
}