import React from 'react'

import { RefreshIcon, ErrorIcon } from "@/hooks/pages/jadwal-rilis/ui/Icons"

export default function ErrorJadwalRilis({ error }: { error: string }) {
    return (
        <section className='min-h-screen py-12 md:py-24 bg-gradient-to-br from-background via-background/95 to-background/90'>
            <div className="container px-4 md:px-6 mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                    Jadwal Rilis Anime
                </h1>
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-card-bg/90 text-error p-8 rounded-3xl border border-error/20 max-w-md w-full backdrop-blur-md animate-fade-in shadow-xl shadow-error/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error via-error/70 to-error/40"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-error/10 p-3 rounded-full">
                                <ErrorIcon />
                            </div>
                            <h2 className="text-xl font-bold">Terjadi Kesalahan</h2>
                        </div>
                        <p className="text-error/90 mb-6 pl-1">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-4 py-3 bg-error/10 hover:bg-error/20 text-error rounded-xl transition-all duration-300 border border-error/20 hover:border-error/40 flex items-center justify-center font-medium hover:shadow-lg hover:shadow-error/10"
                        >
                            <RefreshIcon />
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
