import React, { Fragment } from 'react'

import Home from "@/components/ui/home/Home"

import Swiper from '@/components/ui/swiper/Swiper'

import AnimeMovie from "@/components/ui/movie/Movie"

import Article from "@/components/ui/article/Article"

import Manga from "@/components/ui/manga/Manga"

export default function page() {
  return (
    <Fragment>
      <Swiper />
      <Home />
      <Manga />
      <AnimeMovie />
      <Article />
    </Fragment>
  )
}