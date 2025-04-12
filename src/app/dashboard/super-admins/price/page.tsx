import React from 'react'

import PriceLayout from '@/hooks/dashboard/super-admins/price/PriceLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Price List | Anime Indo",
  description: "Halaman Price List for super admin",
}

export default function page() {
  return (
    <PriceLayout />
  )
}
