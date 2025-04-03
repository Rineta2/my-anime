import React from 'react'

import DaftarAnimeLayout from '@/hooks/pages/daftar-anime/DaftarAnimeLayout'

export const metadata = {
    title: 'Daftar Anime | Anime Indo',
    description: 'Halaman ini berisi daftar anime yang tersedia di Anime Indo',
}

export default function page() {
    return (
        <DaftarAnimeLayout />
    )
}
