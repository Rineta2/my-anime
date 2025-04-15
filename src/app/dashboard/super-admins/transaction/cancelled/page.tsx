import React from 'react'

import TransactionCancelledLayout from '@/hooks/dashboard/super-admins/transaction/cancelled/TransactionCancelledLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Daftar Transaksi Dibatalkan | Anime Indo",
  description: "Halaman daftar transaksi yang dibatalkan",
}

export default function CancelledTransactionPage() {
  return (
    <TransactionCancelledLayout />
  )
}
