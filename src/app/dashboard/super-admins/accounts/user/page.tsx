import React from 'react'

import { Metadata } from 'next'

import UserLayout from '@/hooks/dashboard/super-admins/user/UserLayout'

export const metadata: Metadata = {
    title: "Dashboard Accounts Admins Or Super Admins | Anime Indo",
    description: "Halaman dashboard for super admin",
}

export default function page() {
    return (
        <UserLayout />
    )
}
