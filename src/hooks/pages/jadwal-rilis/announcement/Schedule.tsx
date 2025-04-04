import React from 'react'

import { EmptyIcon, RefreshIcon } from '../ui/Icons'

export default function Schedule() {
    return (
        <section className='min-h-screen py-12 md:py-24 bg-gradient-to-br from-background via-background/95 to-background/90'>
            <div className="container px-4 md:px-6 mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                    Jadwal Rilis Anime
                </h1>
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-card-bg/90 text-text p-8 rounded-3xl border border-primary/20 max-w-md w-full backdrop-blur-md animate-fade-in shadow-xl shadow-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <EmptyIcon />
                            </div>
                            <h2 className="text-xl font-bold text-text">Tidak Ada Data</h2>
                        </div>
                        <p className="text-text-secondary/90 mb-6 pl-1">Tidak ada jadwal rilis anime yang tersedia saat ini.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-300 border border-primary/20 hover:border-primary/40 flex items-center justify-center font-medium hover:shadow-lg hover:shadow-primary/10"
                        >
                            <RefreshIcon />
                            Muat Ulang
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
