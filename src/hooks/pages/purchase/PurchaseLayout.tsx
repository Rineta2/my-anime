"use client"
import React, { useEffect, useState } from 'react'

import { FetchPrice } from './lib/FetchPrice'
import { Price } from './types/price'
import CardPayment from './components/CardPayment'
import { FetchUser } from './lib/FetchUser'
import { useAuth } from '@/utils/context/AuthContext'
import Image from 'next/image'
import { IoTicket } from "react-icons/io5";
import { RiMovie2AiLine } from "react-icons/ri";
import { MdNotificationsActive, MdOutlineHd, MdDevices } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { LiaAdSolid } from "react-icons/lia";
import PaymentModal from './components/PaymentModal'
import { FetchCards } from './lib/FetchCards'
import { Card } from './types/price'

interface CardData {
  id: number;
  name: string;
  icons: React.ReactNode;
}

export const dataCard: CardData[] = [
  {
    id: 1,
    name: "Konten Premium",
    icons: <RiMovie2AiLine className="text-2xl" />,
  },

  {
    id: 2,
    name: "Mendapatkan Notification",
    icons: <MdNotificationsActive className='text-2xl' />
  },

  {
    id: 3,
    name: "Resolusi HD",
    icons: <MdOutlineHd className='text-2xl' />
  },

  {
    id: 4,
    name: "Multi perangkat",
    icons: <MdDevices className='text-2xl' />
  },

  {
    id: 5,
    name: "Gratis unduh",
    icons: <FaDownload className='text-2xl' />
  },

  {
    id: 6,
    name: "Lewati iklan",
    icons: <LiaAdSolid className='text-2xl' />
  }
];

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
}

export default function PurchaseLayout() {
  const [prices, setPrices] = useState<Price[]>([])
  const [user, setUser] = useState<User | null>(null)
  const { user: authUser } = useAuth()
  const [imageError, setImageError] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedCardData, setSelectedCardData] = useState<Card | null>(null)
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const unsubscribe = FetchPrice((data) => {
      setPrices(data)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (authUser?.uid) {
      const unsubscribe = FetchUser(authUser.uid, (data) => {
        setUser(data)
      })

      return () => unsubscribe()
    }
  }, [authUser?.uid])

  useEffect(() => {
    const unsubscribe = FetchCards((data) => {
      setCards(data)
    })

    return () => unsubscribe()
  }, [])

  const handlePriceSelect = (priceId: string) => {
    setSelectedPrice(priceId === selectedPrice ? null : priceId)
  }

  const getSelectedPriceAmount = () => {
    if (!selectedPrice) return undefined;
    const price = prices.find(p => p.id === selectedPrice);
    if (!price || !price.discount) return undefined;

    // Since price.discount is already a number, we can return it directly
    return Number(price.discount);
  }

  const handlePurchase = () => {
    if (!selectedPrice || !selectedCard) {
      alert('Silakan pilih paket dan metode pembayaran terlebih dahulu')
      return
    }

    const cardData = cards.find(card => card.id === selectedCard)
    const packageData = prices.find(p => p.id === selectedPrice)

    if (cardData && packageData) {
      setSelectedCardData(cardData)
      setIsPaymentModalOpen(true)
    }
  }

  return (
    <section className='min-h-screen py-20'>
      <div className="container px-4 md:px-10">
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          {user && (
            <div className="w-full md:w-auto">
              <div className="flex items-center space-x-3 p-3 bg-[var(--card-bg)] backdrop-blur-sm rounded-xl border border-[var(--card-border)] shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative w-10 h-10">
                  {!imageError && user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName}
                      fill
                      className="rounded-full object-cover ring-2 ring-purple-500/20"
                      onError={() => setImageError(true)}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-purple-500/20">
                      <span className="text-lg font-semibold ">
                        {user.displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-base font-semibold ">{user.displayName}</h2>
                  <p className="text-xs ">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className='w-full md:w-auto flex items-center gap-2 rounded-xl bg-[var(--card-bg)] backdrop-blur-sm p-2.5 border border-[var(--card-border)] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group'>
            <IoTicket className="text-lg text-purple-400 group-hover:text-purple-300 transition-colors" />
            <h2 className="text-sm font-medium  group-hover:text-purple-300 transition-colors">Tukar Voucher</h2>
          </div>
        </div>

        <div className='rounded-xl bg-[var(--card-bg)] backdrop-blur-sm p-5 border border-[var(--card-border)] shadow-lg mb-8'>
          <p className="mb-3 text-sm">Langganan Premium untuk menikmati ribuan episode secara gratis</p>
          <h3 className="text-xl font-bold mb-4 ">Keuntungan Premium</h3>

          <div className='flex flex-wrap gap-3'>
            {dataCard.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 p-2.5 bg-[var(--card-bg)] hover:bg-white/10 border border-[var(--card-border)] rounded-lg transition-all duration-300 group flex-1 min-w-[180px]">
                <div className="p-1.5 bg-purple-500/10 rounded-md group-hover:bg-purple-500/20 transition-colors">
                  {item.icons}
                </div>
                <h2 className="text-sm  group-hover:text-purple-300 transition-colors">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 ">Pilihan Paket Premium</h1>

        <div className="flex flex-wrap gap-4">
          {prices.map((price) => (
            <div
              key={price.id}
              className={`bg-[var(--card-bg)] backdrop-blur-sm rounded-xl p-5 border transition-all duration-300 hover:shadow-xl flex-1 min-w-[260px] ${selectedPrice === price.id
                ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                : 'border-[var(--card-border)] hover:border-purple-500/50'
                } cursor-pointer`}
              onClick={() => handlePriceSelect(price.id)}
            >
              <h2 className="text-lg font-semibold mb-3 ">{price.title}</h2>

              <div className='flex flex-col gap-3'>
                {price.discount && (
                  <div className="flex flex-col gap-2 space-y-3">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500  px-4 py-2 rounded-lg text-lg font-medium w-fit shadow-lg shadow-purple-500/20 text-white">
                      Rp. {Number(price.discount).toLocaleString('id-ID')}
                    </span>

                    <div className='flex items-center gap-2'>
                      {price.originalPrice && (
                        <span className=" line-through text-sm">Rp. {Number(price.originalPrice).toLocaleString('id-ID')}</span>
                      )}

                      {price.labelDisc && (
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs w-fit border border-red-500/20">
                          {price.labelDisc}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-2 mt-3">
                {price.list.map((item, index) => (
                  <li key={index} className="flex items-center text-xs">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <CardPayment
            onCardSelect={setSelectedCard}
            selectedCard={selectedCard}
            selectedPriceAmount={getSelectedPriceAmount()}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePurchase}
            disabled={!selectedPrice || !selectedCard}
            className={`px-6 py-3 rounded-lg  font-medium transition-all duration-300 ${selectedPrice && selectedCard
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30'
              : 'bg-gray-600/50 cursor-not-allowed'
              }`}
          >
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedCard={selectedCardData}
        selectedPriceAmount={getSelectedPriceAmount()}
        selectedPackage={selectedPrice ? {
          title: prices.find(p => p.id === selectedPrice)?.title || '',
          discount: Number(prices.find(p => p.id === selectedPrice)?.discount || 0),
          labelDisc: prices.find(p => p.id === selectedPrice)?.labelDisc || undefined,
          originalPrice: Number(prices.find(p => p.id === selectedPrice)?.originalPrice || 0)
        } : undefined}
      />
    </section>
  )
}
