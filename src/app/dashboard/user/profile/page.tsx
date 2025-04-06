import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from '@/hooks/dashboard/user/Profile/profile/ProfileLayout'

export const metadata: Metadata = {
    title: "Dashboard Profile | Anime indo",
    description: "Dashboard User",
}

export default function page() {
    return (
        <ProfileLayout />
    )
}