import React, { Fragment } from 'react'

import AnimeTerbaruLayout from "@/hooks/pages/anime-terbaru/AnimeTerbaruLayout"

import Swipper from "@/hooks/pages/anime-terbaru/swiper/Swipper"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Anime Terbaru | Anime Indo",
    description: "Halaman ini menampilkan anime terbaru yang tersedia di Anime Indo",
}

export default function AnimeTerbaru() {
    return (
        <Fragment>
            <Swipper />
            <AnimeTerbaruLayout />
        </Fragment>
    )
}
