import React from 'react'

import CardLayout from '@/hooks/dashboard/super-admins/price/card/CardLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Card List | Anime Indo",
  description: "Halaman Card List for super admin",
}

export default function page() {
  return (
    <CardLayout />
  )
}
