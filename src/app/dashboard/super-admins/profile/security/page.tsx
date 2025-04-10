import React from 'react'

import { Metadata } from 'next'

import SecurityLayout from '@/hooks/dashboard/super-admins/Profile/security/SecurityLayout'

export const metadata: Metadata = {
    title: "Security Account | Anime indo",
    description: "Halaman security account for super admin",
}

export default function page() {
    return (
        <SecurityLayout />
    )
}