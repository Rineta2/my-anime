import React from 'react'

import TransactionReturnLayout from '@/hooks/dashboard/super-admins/transaction/return/TransactionReturnLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Daftar Transaksi Return | Anime Indo",
  description: "Halaman daftar transaksi yang dikembalikan",
}

export default function ReturnTransactionPage() {
  return (
    <TransactionReturnLayout />
  )
}
