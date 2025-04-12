import React, { Fragment } from 'react'

import Home from "@/components/ui/home/Home"

import Swiper from '@/components/ui/swiper/Swiper'

import BatchList from "@/components/ui/betch/Batch"

import AnimeMovie from "@/components/ui/movie/Movie"

import Article from "@/components/ui/article/Article"

export default function page() {
  return (
    <Fragment>
      <Swiper />
      <Home />
      <BatchList />
      <AnimeMovie />
      <Article />
    </Fragment>
  )
}