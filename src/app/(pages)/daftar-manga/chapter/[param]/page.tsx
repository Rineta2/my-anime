import React from 'react'

import ChapterPage from "@/hooks/pages/daftar-komik/chapter/ChapterLayout"

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
  const title = `Chapter ${param} | My Anime`;
  const description = `Read Chapter ${param} online. Enjoy high-quality manga reading experience.`;
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
    <ChapterPage params={Promise.resolve({ param })} />
  )
}
