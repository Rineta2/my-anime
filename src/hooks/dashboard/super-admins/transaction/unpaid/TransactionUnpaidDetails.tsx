"use client"

import React, { useState } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { useScrollLock } from '@/base/helper/useScrollLock'

import { Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import { TransactionDetailsProps } from "@/hooks/dashboard/super-admins/transaction/transaction/types/transaction"

import toast from 'react-hot-toast'

export default function TransactionUnpaidDetails({ transaction }: TransactionDetailsProps) {
  const [showProofModal, setShowProofModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useScrollLock(showProofModal || showDeleteModal);

  const handleReject = async () => {
    try {
      const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string, transaction.id);
      await updateDoc(transactionRef, {
        status: 'rejected',
        updatedAt: new Date()
      });
      toast.success('Transaksi berhasil ditolak!');
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      toast.error('Gagal menolak transaksi. Silakan coba lagi.');
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string, transaction.id);
      await deleteDoc(transactionRef);
      toast.success('Transaksi berhasil dihapus!');
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Gagal menghapus transaksi. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '0';
    return value.toLocaleString('id-ID');
  };

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
            <Image
              src={transaction.user?.photoURL || '/default-avatar.png'}
              alt={transaction.user?.nama || 'User'}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{transaction.user?.nama || 'Unknown User'}</p>
              <p className="text-sm text-gray-500">UID: {transaction.user?.uid || 'N/A'}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'success' ? 'bg-green-500/20 text-green-500' :
            transaction.status === 'failed' ? 'bg-red-500/20 text-red-500' :
              transaction.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                'bg-yellow-500/20 text-yellow-500'
            }`}>
            {transaction.status || 'pending'}
          </span>
        </div>

        {/* Package and Payment Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">{transaction.selectedPackage?.title || 'Unknown Package'}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                Rp {formatCurrency(transaction.selectedPackage?.discount)}
              </span>
              {transaction.selectedPackage?.originalPrice && (
                <span className="line-through text-gray-500">
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

          <div className="flex items-center gap-3 p-3 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)]">
            <Image
              src={transaction.card?.imageUrl || '/default-card.png'}
              alt={transaction.card?.title || 'Payment Card'}
              width={32}
              height={32}
              className="object-contain"
            />
            <div>
              <p className="font-medium">{transaction.card?.title || 'Unknown Card'}</p>
              <p className="text-sm text-gray-500">{transaction.card?.name || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-semibold">Rp {formatCurrency(transaction.amount)}</p>
            </div>
            <div>
              <p className="text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(transaction.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
            <button
              onClick={handleReject}
              disabled={transaction.status === 'rejected'}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${transaction.status === 'rejected'
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              {transaction.status === 'rejected' ? 'Ditolak' : 'Tolak'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Proof of Payment Modal */}
      {showProofModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Proof of Payment</h3>
            <div className="relative aspect-video">
              <Image
                src={transaction.proofOfPayment}
                alt="Proof of Payment"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`flex-1 px-4 py-2 bg-red-500 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                  }`}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menghapus...
                  </>
                ) : (
                  'Hapus'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
} 