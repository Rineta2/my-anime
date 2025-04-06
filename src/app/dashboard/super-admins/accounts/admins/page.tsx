import React from 'react'

import { Metadata } from 'next'

import AdminSkelaton from '@/hooks/dashboard/super-admins/admins/AdminLayout'

export const metadata: Metadata = {
    title: "Dashboard Accounts Admins Or Super Admins | Anime Indo",
    description: "Halaman dashboard for super admin",
}

export default function page() {
    return (
        <AdminSkelaton />
    )
}
