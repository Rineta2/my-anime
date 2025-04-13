import React from 'react'

import MangaDetailPage from '@/hooks/pages/daftar-komik/manga-details/MangaDetailPage'

import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ param: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { param } = await params;
  const formattedTitle = param.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const title = `${formattedTitle} | My Anime`;
  const description = `Read ${formattedTitle} manga online. Enjoy high-quality manga reading experience.`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { param } = await params;

  return (
    <MangaDetailPage params={Promise.resolve({ param })} />
  )
}
