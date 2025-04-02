import React from 'react'

export default function ErrorBatch() {
    return (
        <section className="container mx-auto px-4 py-28">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-500">Data tidak ditemukan</h1>
                <p className="mt-2 text-gray-600">Maaf, data batch tidak tersedia.</p>
            </div>
        </section>
    )
}
