"use client"

import React, { useEffect, useState } from 'react';

import { collection, getDocs, Timestamp } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { IoReceiptOutline } from 'react-icons/io5';

interface TransactionData {
  user: {
    nama: string;
    photoURL: string;
    uid: string;
  };
  card: {
    imageUrl: string;
    title: string;
    name: string;
  };
  selectedPackage: {
    title: string;
    discount: number;
    labelDisc?: string;
    originalPrice?: number;
  };
  amount: number;
  status: 'pending' | 'success' | 'failed';
  proofOfPayment: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function PaymentStatus({ params }: { params: Promise<{ id: string }> }) {
  const [transaction, setTransaction] = useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const resolvedParams = React.use(params);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        // Clean the ID
        const cleanId = resolvedParams.id.replace(/%22/g, '');

        // Get all transactions
        const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string);
        const querySnapshot = await getDocs(transactionsRef);

        // Find the transaction with matching transactionLink
        const transaction = querySnapshot.docs.find(doc => {
          const data = doc.data();
          const storedLink = data.transactionLink;
          const currentLink = `/payment-status/${cleanId}`;
          return storedLink === currentLink;
        });

        if (transaction) {
          const data = transaction.data();
          setTransaction(data as TransactionData);
        }
      } catch {
        // Error handling without console.error
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--card-bg)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--card-bg)]">
        <div className="text-center p-8 bg-[var(--card-bg)] backdrop-blur-sm rounded-xl border border-[var(--card-border)] shadow-lg">
          <h1 className="text-2xl font-bold mb-4 ">Transaksi tidak ditemukan</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500  rounded-lg hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 ">
      <div className="container px-4 md:px-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-xl border border-[var(--card-border)] shadow-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-4">
            <h1 className="text-xl font-bold">Status Pembayaran</h1>
            <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${transaction.status === 'success' ? 'bg-green-500/10 text-green-400' :
              transaction.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                'bg-yellow-500/10 text-yellow-400'
              }`}>
              {transaction.status === 'success' ? 'Berhasil' :
                transaction.status === 'failed' ? 'Gagal' : 'Menunggu Konfirmasi'}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-[var(--card-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg transition-all duration-300">
              <Image
                src={transaction.card.imageUrl}
                alt={transaction.card.title}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <p className="font-medium ">{transaction.card.title}</p>
                <p className="text-sm ">{transaction.card.name}</p>
              </div>
            </div>

            <div className="p-4 bg-[var(--card-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg transition-all duration-300">
              <p className="text-sm  mb-2">Detail Paket</p>
              <div className="space-y-2">
                <p className="font-medium text-lg ">{transaction.selectedPackage.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold ">
                    Rp {transaction.selectedPackage.discount.toLocaleString('id-ID')}
                  </span>
                  {transaction.selectedPackage.originalPrice && (
                    <span className=" line-through text-sm">
                      Rp {transaction.selectedPackage.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                  {transaction.selectedPackage.labelDisc && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs border border-red-500/20">
                      {transaction.selectedPackage.labelDisc}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[var(--card-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg transition-all duration-300">
              <p className="text-sm  mb-2">Total Pembayaran</p>
              <p className="text-xl font-bold ">
                Rp {transaction.amount.toLocaleString('id-ID')}
              </p>
            </div>

            {transaction.proofOfPayment && (
              <div className="p-4 bg-[var(--card-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg transition-all duration-300">
                <p className="text-sm  mb-3">Bukti Pembayaran</p>
                <Image
                  src={transaction.proofOfPayment}
                  alt="Bukti Pembayaran"
                  width={400}
                  height={400}
                  className="rounded-lg w-full object-contain"
                />
              </div>
            )}

            <div className="p-4 bg-[var(--card-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg transition-all duration-300">
              <p className="text-sm  mb-3">Detail Transaksi</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className=" text-sm">ID Transaksi</p>
                  <p className=" text-sm">{resolvedParams.id}</p>
                </div>
                <div className="flex justify-between">
                  <p className=" text-sm">Tanggal</p>
                  <p className=" text-sm">{new Date(transaction.createdAt.seconds * 1000).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex justify-between">
                  <p className=" text-sm">Status</p>
                  <p className={`text-sm ${transaction.status === 'success' ? 'text-green-400' :
                    transaction.status === 'failed' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                    {transaction.status === 'success' ? 'Berhasil' :
                      transaction.status === 'failed' ? 'Gagal' :
                        'Menunggu Konfirmasi'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4 gap-3">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500  rounded-lg hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 text-white hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={() => router.push('/dashboard/user/transaction')}
              className="px-6 py-2.5 bg-[var(--card-bg)] hover:bg-[var(--card-bg)]  rounded-lg border border-[var(--card-border)] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <IoReceiptOutline className="text-lg" />
              Lihat Transaksi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 