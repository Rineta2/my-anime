import React from 'react'

export default function LengthHistory() {
    return (
        <section className='min-h-full flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center text-center p-8 bg-[var(--card-bg)] rounded-3xl shadow-lg w-full backdrop-blur-sm border border-[var(--border-color)] relative z-10'>
                <div className="w-24 h-24 mb-6 text-[var(--primary)] animate-pulse relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/20 animate-ping"></div>
                </div>

                <h3 className="text-2xl font-bold mb-3 tracking-tight">Belum Ada Riwayat Tontonan</h3>
                <p className="text-sm md:text-base leading-relaxed max-w-sm text-gray-400">
                    Mulai menonton anime favoritmu untuk melihat riwayat tontonan di sini
                </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10 w-full">
                <div className="flex flex-col items-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-[var(--primary)]/20 relative group w-full">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 mb-4 text-[var(--primary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="text-[var(--primary)] text-lg font-semibold">Anime Update</span>
                    <span className="text-gray-400 text-sm mt-1">Terbaru</span>
                </div>

                <div className="flex flex-col items-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-[var(--primary)]/20 relative group w-full">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 mb-4 text-[var(--primary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div>
                    <span className="text-[var(--primary)] text-lg font-semibold">Favorit</span>
                    <span className="text-gray-400 text-sm mt-1">Koleksi</span>
                </div>

                <div className="flex flex-col items-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-[var(--primary)]/20 relative group w-full">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 mb-4 text-[var(--primary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                    </div>
                    <span className="text-[var(--primary)] text-lg font-semibold">Rekomendasi</span>
                    <span className="text-gray-400 text-sm mt-1">Untukmu</span>
                </div>
            </div>
        </section>
    )
}
