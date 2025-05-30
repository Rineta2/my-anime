import type { Metadata } from 'next'

import ArticleDetailsContent from '@/hooks/pages/articles/[slug]/ArticleDetailsContent'

import { generateMetadata as getArticleMetadata } from '@/components/ui/article/metadata/metadata'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const resolvedParams = await params
  return getArticleMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params
  return <ArticleDetailsContent slug={resolvedParams.slug} />
}