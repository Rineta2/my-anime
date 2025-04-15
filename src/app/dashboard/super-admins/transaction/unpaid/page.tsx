import React from 'react'

import TransactionUnpaidLayout from '@/hooks/dashboard/super-admins/transaction/unpaid/TransactionUnpaidLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Daftar Transaksi Unpaid | Anime Indo",
  description: "Halaman daftar transaksi yang belum dibayar",
}

export default function UnpaidTransactionPage() {
  return (
    <TransactionUnpaidLayout />
  )
}
