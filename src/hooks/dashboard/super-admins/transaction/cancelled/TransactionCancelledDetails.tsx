"use client"

import React, { useState } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { IoEyeOutline } from 'react-icons/io5'

import { useScrollLock } from '@/base/helper/useScrollLock'

import { Timestamp, doc, updateDoc } from 'firebase/firestore'

import { TransactionDetailsProps } from "@/hooks/dashboard/super-admins/transaction/transaction/types/transaction"

import { db } from '@/utils/firebase/firebase'

import toast from 'react-hot-toast'

export default function TransactionPaidDetails({ transaction }: TransactionDetailsProps) {
  const [showProofModal, setShowProofModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  useScrollLock(showProofModal || showDeleteModal);

  // Helper function to safely format numbers
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '0';
    return value.toLocaleString('id-ID');
  };

  // Helper function to format timestamp
  const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleDelete = async () => {
    try {
      setIsProcessing(true);
      const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string, transaction.id);

      // Delete the transaction
      await updateDoc(transactionRef, {
        status: 'deleted',
        updatedAt: new Date()
      });

      toast.success('Transaksi berhasil dihapus!');
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Gagal menghapus transaksi. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] hover:shadow-lg transition-all duration-300"
      >
        {/* Header with User Info and Status */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={transaction.user?.photoURL || '/default-avatar.png'}
                alt={transaction.user?.nama || 'User'}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-[var(--text)]">{transaction.user?.nama || 'Unknown User'}</p>
              <p className="text-sm text-[var(--text-secondary)]">UID: {transaction.user?.uid || 'N/A'}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'success' ? 'bg-green-500/20 text-green-500' :
            transaction.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
              'bg-yellow-500/20 text-yellow-500'
            }`}>
            {transaction.status || 'pending'}
          </span>
        </div>

        {/* Package and Payment Info */}
        <div className="space-y-4">
          <div className="bg-[var(--hover-bg)] p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2 text-[var(--text)]">{transaction.selectedPackage?.title || 'Unknown Package'}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--text)]">
                Rp {formatCurrency(transaction.selectedPackage?.discount)}
              </span>
              {transaction.selectedPackage?.originalPrice && (
                <span className="line-through text-[var(--text-secondary)]">
                  Rp {formatCurrency(transaction.selectedPackage.originalPrice)}
                </span>
              )}
              {transaction.selectedPackage?.labelDisc && (
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                  {transaction.selectedPackage.labelDisc}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[var(--hover-bg)] rounded-lg">
            <div className="relative w-10 h-10">
              <Image
                src={transaction.card?.imageUrl || '/default-card.png'}
                alt={transaction.card?.title || 'Payment Card'}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-medium text-[var(--text)]">{transaction.card?.title || 'Unknown Card'}</p>
              <p className="text-sm text-[var(--text-secondary)]">{transaction.card?.name || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-[var(--hover-bg)] p-3 rounded-lg">
              <p className="text-[var(--text-secondary)] mb-1">Total Amount</p>
              <p className="font-semibold text-[var(--text)]">Rp {formatCurrency(transaction.amount)}</p>
            </div>
            <div className="bg-[var(--hover-bg)] p-3 rounded-lg">
              <p className="text-[var(--text-secondary)] mb-1">Created At</p>
              <p className="font-medium text-[var(--text)]">{formatDate(transaction.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Proof of Payment Button */}
        {transaction.proofOfPayment && (
          <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
            <button
              onClick={() => setShowProofModal(true)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              <IoEyeOutline className="w-5 h-5" />
              <span className="text-sm font-medium">Lihat Bukti Pembayaran</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[var(--card-bg)] rounded-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Konfirmasi Hapus</h3>
            <p className="text-[var(--text-secondary)] mb-6">Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-colors duration-200 bg-[var(--hover-bg)] text-[var(--text)] hover:bg-[var(--hover-bg-hover)]"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Hapus'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Proof of Payment Modal */}
      {showProofModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowProofModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[var(--card-bg)] rounded-xl p-6 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProofModal(false)}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Bukti Pembayaran</h3>
            <div className="relative aspect-video">
              <Image
                src={transaction.proofOfPayment}
                alt="Bukti Pembayaran"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
} 