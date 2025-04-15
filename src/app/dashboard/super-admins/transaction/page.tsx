import React from 'react'

import TransactionLayout from '@/hooks/dashboard/super-admins/transaction/transaction/TransactionLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Daftar Transaksi | Anime Indo",
  description: "Halaman daftar transaksi",
}

export default function page() {
  return (
    <TransactionLayout />
  )
}
