import React from 'react'

import { Metadata } from 'next'

import SecurityLayout from '@/hooks/dashboard/user/Profile/security/SecurityLayout'

export const metadata: Metadata = {
    title: "Security Account | Anime indo",
    description: "Security Account",
}

export default function page() {
    return (
        <SecurityLayout />
    )
}