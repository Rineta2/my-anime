import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card } from '../types/price';
import { FaCopy, FaCheck, FaUpload } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { CreateTransaction, UploadProofOfPayment, UpdateTransactionWithLink } from '../lib/CreateTransaction';
import { useAuth } from '@/utils/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: Card | null;
  selectedPriceAmount?: number;
  selectedPackage?: {
    title: string;
    discount: number;
    labelDisc?: string;
    originalPrice?: number;
  };
}

export default function PaymentModal({ isOpen, onClose, selectedCard, selectedPriceAmount, selectedPackage }: PaymentModalProps) {
  const [showPaymentSteps, setShowPaymentSteps] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinishingPayment, setIsFinishingPayment] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [proofImage, setProofImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (showPaymentSteps && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showPaymentSteps, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !selectedCard || !user) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(selectedCard.number.toString());
    toast.success('Nomor rekening berhasil disalin!');
  };

  const handleContinuePayment = async () => {
    if (!selectedPriceAmount || !selectedPackage) return;

    setIsCreatingTransaction(true);
    try {
      const result = await CreateTransaction({
        user: {
          uid: user.uid,
          nama: user.displayName || 'Anonymous',
          photoURL: user.photoURL || ''
        },
        card: {
          imageUrl: selectedCard.imageUrl,
          title: selectedCard.title,
          name: selectedCard.name
        },
        amount: selectedPriceAmount,
        status: 'pending',
        selectedPackage: {
          title: selectedPackage.title,
          discount: selectedPackage.discount,
          labelDisc: selectedPackage.labelDisc || null,
          originalPrice: selectedPackage.originalPrice || null
        }
      });

      if (result.success && result.id) {
        setTransactionId(result.id);
        setShowPaymentSteps(true);
      } else {
        toast.error('Gagal membuat transaksi. Silakan coba lagi.');
      }
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !transactionId) return;

    setIsUploading(true);
    try {
      const result = await UploadProofOfPayment(transactionId, file);
      if (result.success && result.url) {
        setProofImage(result.url);
        setCurrentStep(3);
        setShowConfirmationModal(true);
      } else {
        toast.error('Gagal mengupload bukti pembayaran. Silakan coba lagi.');
      }
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFinishPayment = async () => {
    if (transactionId) {
      setIsFinishingPayment(true);
      try {
        // Update transaction with link
        await UpdateTransactionWithLink(transactionId);
        onClose();
        router.push(`/payment-status/${transactionId}`);
      } catch {
        // Still redirect even if updating link fails
        onClose();
        router.push(`/payment-status/${transactionId}`);
      } finally {
        setIsFinishingPayment(false);
      }
    }
  };

  return (
    <div className="relative">
      <dialog id="payment_modal" className="modal" open={isOpen}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {showPaymentSteps ? 'Langkah Pembayaran' : 'Konfirmasi Pembayaran'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--border-color)] rounded-xl transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="w-full mb-8">
              <div className="relative pt-4">
                <div className="overflow-hidden mb-8">
                  <div className="w-full">
                    <div className="relative">
                      {/* Steps Container */}
                      <div className="relative flex justify-between">
                        {/* Connecting Lines Container */}
                        <div className="absolute top-3 left-0 right-0 flex justify-between items-center px-3">
                          {/* Background Lines */}
                          <div className="w-full h-[1.5px] bg-gray-200"></div>
                          {/* Progress Line */}
                          <div
                            className="absolute top-0 left-0 h-[1.5px] bg-primary transition-all duration-500 ease-in-out"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                          ></div>
                        </div>

                        {/* Steps */}
                        {[
                          { step: 1, label: "Transfer" },
                          { step: 2, label: "Upload Bukti" },
                          { step: 3, label: "Konfirmasi" },
                          { step: 4, label: "Selesai" }
                        ].map(({ step, label }) => (
                          <div key={step} className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center 
                                ${currentStep >= step ? 'bg-primary shadow-lg' : 'bg-gray-200'}`}
                            >
                              <span className={`text-xs font-medium
                                ${currentStep >= step ? 'text-white' : 'text-gray-500'}`}
                              >
                                {step}
                              </span>
                            </div>
                            <span className={`mt-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-500
                              ${currentStep >= step ? 'text-primary' : 'text-gray-400'}`}
                            >
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!showPaymentSteps ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
                  <Image
                    src={selectedCard.imageUrl}
                    alt={selectedCard.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="font-medium">{selectedCard.title}</p>
                    <p className="text-sm text-gray-500">{selectedCard.name}</p>
                  </div>
                </div>

                {selectedPriceAmount && (
                  <div className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Total Pembayaran</p>
                    <p className="text-2xl font-bold">Rp {selectedPriceAmount.toLocaleString('id-ID')}</p>
                  </div>
                )}

                <div className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Nomor Rekening</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">{selectedCard.number}</p>
                    <div className="relative">
                      <button
                        onClick={handleCopyNumber}
                        className="p-2 hover:bg-[var(--border-color)] rounded-lg transition-colors"
                        title="Salin nomor"
                      >
                        <FaCopy className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinuePayment}
                  disabled={isCreatingTransaction}
                  className={`w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors ${isCreatingTransaction ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isCreatingTransaction ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-500 rounded-lg">
                  <IoTimeOutline className="text-xl" />
                  <span className="font-medium">Batas Waktu Pembayaran: {formatTime(timeLeft)}</span>
                </div>

                <div className="space-y-4">
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${currentStep >= 1 ? 'bg-green-500/10 text-green-500' : 'bg-[var(--card-bg)] border border-[var(--card-border)]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {currentStep > 1 ? <FaCheck /> : '1'}
                    </div>
                    <div>
                      <p className="font-medium">Transfer ke Nomor Rekening</p>
                      <p className="text-sm">Rp {selectedPriceAmount?.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-4 rounded-lg ${currentStep >= 2 ? 'bg-green-500/10 text-green-500' : 'bg-[var(--card-bg)] border border-[var(--card-border)]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-[var(--card-bg)] border border-[var(--card-border)]'}`}>
                      {currentStep > 2 ? <FaCheck /> : '2'}
                    </div>
                    <div className="w-full">
                      <p className="font-medium">Konfirmasi Pembayaran</p>
                      <p className="text-sm">Upload bukti transfer</p>
                      {!proofImage && currentStep === 2 && (
                        <div className="mt-4">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            onClick={handleUploadClick}
                            disabled={isUploading}
                            className={`flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <FaUpload />
                            {isUploading ? 'Mengupload...' : 'Upload Bukti Transfer'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-4 rounded-lg ${currentStep >= 3 ? 'bg-green-500/10 text-green-500' : 'bg-[var(--card-bg)] border border-[var(--card-border)]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-[var(--card-bg)] border border-[var(--card-border)]'}`}>
                      {currentStep > 3 ? <FaCheck /> : '3'}
                    </div>
                    <div className="w-full">
                      <p className="font-medium">Pembayaran Selesai</p>
                      <p className="text-sm">Tunggu konfirmasi dari admin</p>
                      {proofImage && (
                        <div className="mt-4">
                          <Image
                            src={proofImage}
                            alt="Bukti Transfer"
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {currentStep < 3 && !proofImage && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Langkah Selanjutnya
                  </button>
                )}

                {currentStep === 3 && proofImage && (
                  <button
                    onClick={handleFinishPayment}
                    disabled={isFinishingPayment}
                    className={`mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${isFinishingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isFinishingPayment ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      'Selesaikan Pembayaran'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </dialog>

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="text-center">
              <FaCheck className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Berhasil!</h3>
              <p className="text-gray-600 mb-6">
                Bukti pembayaran Anda telah berhasil diupload. Silakan tunggu konfirmasi dari admin.
              </p>
              <button
                onClick={handleFinishPayment}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Selesaikan Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 