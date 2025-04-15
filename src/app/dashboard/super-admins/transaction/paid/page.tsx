import React from 'react'

import TransactionPaidLayout from '@/hooks/dashboard/super-admins/transaction/paid/TransactionPaidLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Daftar Transaksi Unpaid | Anime Indo",
  description: "Halaman daftar transaksi yang belum dibayar",
}

export default function UnpaidTransactionPage() {
  return (
    <TransactionPaidLayout />
  )
}
