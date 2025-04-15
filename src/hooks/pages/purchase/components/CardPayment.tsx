"use client"

import React, { useEffect, useState } from 'react'

import { Card } from '../types/price'

import { FetchCards } from '../lib/FetchCards'

import Image from 'next/image'

interface CardPaymentProps {
  onCardSelect: (cardId: string | null) => void;
  selectedCard: string | null;
  selectedPriceAmount?: number;
}

export default function CardPayment({ onCardSelect, selectedCard, selectedPriceAmount }: CardPaymentProps) {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const unsubscribe = FetchCards((data) => {
      // Filter out Gopay cards if selected price is below 25000
      const filteredCards = data.filter(card => {
        const isGopay = card.title.toLowerCase().includes('gopay');
        if (isGopay && selectedPriceAmount !== undefined) {
          return selectedPriceAmount >= 25000;
        }
        return true;
      });

      // Sort cards by createdAt in descending order (newest first)
      const sortedCards = filteredCards.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setCards(sortedCards);

      // Automatically select the newest card if no card is selected
      if (!selectedCard && sortedCards.length > 0) {
        onCardSelect(sortedCards[0].id);
      }
    })

    return () => unsubscribe()
  }, [selectedPriceAmount, selectedCard, onCardSelect])

  const handleCardClick = (cardId: string) => {
    onCardSelect(cardId === selectedCard ? null : cardId);
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Metode Pembayaran:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`border bg-[var(--card-bg)] rounded-lg p-4 flex items-center space-x-4 cursor-pointer transition-all duration-200 ${selectedCard === card.id
              ? 'border-purple-500'
              : 'hover:border-purple-300'
              }`}
            onClick={() => handleCardClick(card.id)}
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={500}
              height={500}
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className="font-medium">{card.title}</p>
              <p className="text-sm">{card.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 