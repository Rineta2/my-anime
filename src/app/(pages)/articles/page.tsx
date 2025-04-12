import React, { Fragment } from 'react'

import ArticlesLayout from '@/hooks/pages/articles/ArticlesLayout'

import HeroArticles from "@/hooks/pages/articles/HeroArticles"

export const metadata = {
  title: 'Articles | Anime Indo',
  description: 'Halaman ini berisi articles',
}

export default function Articles() {
  return (
    <Fragment>
      <HeroArticles />
      <ArticlesLayout />
    </Fragment>
  )
}
