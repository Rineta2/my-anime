import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from '@/hooks/dashboard/super-admins/Profile/profile/ProfileLayout'

export const metadata: Metadata = {
    title: "Dashboard Profile | Anime indo",
    description: "Halaman profile for super admin",
}

export default function page() {
    return (
        <ProfileLayout />
    )
}