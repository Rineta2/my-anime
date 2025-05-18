import React, { Fragment } from 'react'

import Home from "@/components/ui/home/Home"

import Swiper from '@/components/ui/swiper/Swiper'

import Article from "@/components/ui/article/Article"

import Manga from "@/components/ui/manga/Manga"

export default function page() {
  return (
    <Fragment>
      <Swiper />
      <Home />
      <Manga />
      <Article />
    </Fragment>
  )
}