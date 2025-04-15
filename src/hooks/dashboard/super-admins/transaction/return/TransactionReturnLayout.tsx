"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { collection, onSnapshot } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import TransactionReturnDetails from '@/hooks/dashboard/super-admins/transaction/return/TransactionReturnDetails'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/transaction/types/transaction'

import TransactionSkelaton from "@/hooks/dashboard/super-admins/transaction/transaction/TransactionSkeleton"

export default function TransactionLayout() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string)

    const unsubscribe = onSnapshot(transactionsRef, (querySnapshot) => {
      const transactionsData = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Transaction))
        .filter(transaction => transaction.status === 'return')
      setTransactions(transactionsData)
      setLoading(false)
    }, (error) => {
      console.error('Error listening to transactions:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <TransactionSkelaton />
    )
  }

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center p-8"
      >
        <div className="w-64 h-64 mb-8">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z"
              fill="#F3F4F6"
            />
            <path
              d="M100 140C122.091 140 140 122.091 140 100C140 77.9086 122.091 60 100 60C77.9086 60 60 77.9086 60 100C60 122.091 77.9086 140 100 140Z"
              fill="#E5E7EB"
            />
            <path
              d="M100 120C110.493 120 119 111.493 119 101C119 90.5066 110.493 82 100 82C89.5066 82 81 90.5066 81 101C81 111.493 89.5066 120 100 120Z"
              fill="#D1D5DB"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">No Transactions Found</h2>
        <p className="text-center max-w-md">
          There are currently no return transactions in the system. Check back later for updates.
        </p>
      </motion.div>
    )
  }

  return (
    <section className='min-h-screen'>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--card-bg)] rounded-2xl shadow-lg border border-[var(--border-color)] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='text-3xl sm:text-4xl font-bold'
          >
            Daftar Transaksi Return
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-base sm:text-lg"
          >
            Daftar transaksi yang terjadi kembali
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base font-medium"
        >
          <motion.svg
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </motion.svg>
          Show filter
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map((transaction) => (
          <TransactionReturnDetails key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </section>
  )
}
