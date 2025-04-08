import React, { Fragment } from 'react'

import AnimeTerbaruLayout from '@/hooks/pages/anime-terbaru/AnimeTerbaruLayout'

import HeroSlider from "@/hooks/pages/anime-terbaru/swiper/Swipper"

export const metadata = {
  title: 'Anime Terbaru | Anime Indo',
  description: 'Halaman ini berisi anime terbaru yang tersedia di Anime Indo',
}

export default function AnimeTerbaru() {
  return (
    <Fragment>
      <HeroSlider />
      <AnimeTerbaruLayout />
    </Fragment>
  )
}
