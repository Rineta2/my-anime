"use client"

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import ArticleDetailsSkeleton from "@/hooks/pages/articles/[slug]/ArticleDetailsSkelaton"

import ArticleNotFound from "@/hooks/pages/articles/[slug]/ArticleNotFound"

import ShareButtons from "@/hooks/pages/articles/[slug]/ShareButtons"

import { FetchArticleDetails, FetchRelatedArticles } from '@/hooks/pages/articles/[slug]/utils/FetchDetailsArticle'

import { ArticleType } from '@/components/ui/article/types/article'

interface ArticleDetailsContentProps {
  slug: string;
}

interface ArticleState {
  data: ArticleType[];
  loading: boolean;
}

interface RelatedArticlesState {
  data: ArticleType[];
  loading: boolean;
}

export default function ArticleDetailsContent({ slug }: ArticleDetailsContentProps) {
  const [articles, setArticles] = useState<ArticleState>({ data: [], loading: true });
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticlesState>({ data: [], loading: true });

  useEffect(() => {
    const unsubscribeArticle = FetchArticleDetails(slug, (articleData) => {
      setArticles({ data: articleData, loading: false });
    });

    const unsubscribeRelated = FetchRelatedArticles(slug, (relatedData) => {
      // Filter out the current article and limit to 3
      const filteredRelated = relatedData
        .filter(article => article.slug !== slug)
        .slice(0, 3);
      setRelatedArticles({ data: filteredRelated, loading: false });
    });

    return () => {
      unsubscribeArticle();
      unsubscribeRelated();
    };
  }, [slug]);

  if (articles.loading) return <ArticleDetailsSkeleton />

  const article = articles.data.find((article: ArticleType) => article.slug === slug)
  if (!article) return <ArticleNotFound />

  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`

  return (
    <section className="py-20 lg:py-24">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <div className='space-y-1'>
              {/* Article Header */}
              <header className="space-y-4">
                <span className="inline-flex items-center px-4 sm:px-5 py-2 rounded-full sm:py-2.5 bg-indigo-100/80 text-indigo-700 text-sm font-medium transition-all duration-300 hover:bg-indigo-200/80 hover:scale-105 backdrop-blur-sm">
                  {article.category}
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                  {article.title}
                </h1>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-4 sm:p-6 md:p-8 bg-[var(--card-bg)] rounded-xl sm:rounded-2xl backdrop-blur-sm border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <Image
                        src={article.author.photoURL}
                        alt={article.author.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-white shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{article.author.name}</h3>
                      <p className="text-xs sm:text-sm text-[var(--text-color)] capitalize">{article.author.role}</p>
                    </div>
                  </div>

                  <time className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-color)] sm:ml-auto">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(article.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-base sm:prose-lg md:prose-xl max-w-none prose-headings:text-[var(--text-color)] prose-p:text-[var(--text-color)] prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-a:font-medium prose-a:transition-all prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-none prose-blockquote:p-4 sm:prose-blockquote:p-6 md:prose-blockquote:p-8 prose-blockquote:bg-gradient-to-br prose-blockquote:from-white prose-blockquote:to-indigo-50/80 prose-blockquote:rounded-xl sm:prose-blockquote:rounded-2xl prose-blockquote:shadow-sm hover:prose-blockquote:shadow-md prose-blockquote:transition-all prose-blockquote:duration-300 prose-blockquote:backdrop-blur-sm prose-blockquote:border prose-blockquote:border-indigo-100">
                <article className="space-y-4">
                  {/* Split content into parts and render them */}
                  {article.content.split('<ol>').map((part: string, partIndex: number) => (
                    <React.Fragment key={`content-part-${partIndex}`}>
                      {partIndex === 0 ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: part.replace(
                              /<iframe[^>]*src="([^"]*)"[^>]*><\/iframe>/g,
                              (match, src) => {
                                // Convert YouTube embed URLs to use the embed format
                                if (src.includes('youtube.com')) {
                                  return `<div class="relative w-full h-[250px] md:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg mb-[-5rem]">
                                    <iframe 
                                      src="${src}"
                                      class="absolute top-0 left-0 w-full h-full"
                                      frameborder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen
                                    ></iframe>
                                  </div>`
                                }
                                return match
                              }
                            )
                          }}
                          className="text-xl leading-relaxed text-[var(--text-color)] flex flex-col gap-4"
                        />
                      ) : (
                        <>
                          <ol className="list-decimal list-outside space-y-12 pl-8">
                            {part
                              .match(/<li[^>]*>(.*?)<\/li>/g)
                              ?.map((item: string, itemIndex: number) => {
                                const content = item
                                  .replace(/<\/?li[^>]*>/g, '')
                                  .replace(/<span[^>]*>[^<]*<\/span>/g, '')
                                  .split('<strong>')

                                if (content.length < 2) return null

                                const [title, ...description] = content[1].split('</strong>')

                                return (
                                  <li key={`list-item-${partIndex}-${itemIndex}`} className="pl-2">
                                    <h3 className="text-2xl font-bold text-[var(--text-color)] mb-4">
                                      {title}
                                    </h3>
                                    <p className="text-[var(--text-color)] leading-relaxed">
                                      {description.join('')}
                                    </p>
                                  </li>
                                )
                              })}
                          </ol>
                          {/* Render content after the ordered list */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: part.split('</ol>')[1] || ''
                            }}
                            className="text-xl leading-relaxed text-[var(--text-color)] flex flex-col gap-4"
                          />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </article>
              </div>

              {/* Share Section */}
              <div className="pt-8 sm:pt-12 border-t border-[var(--border-color)]">
                <h4 className="text-xl sm:text-2xl font-semibold text-[var(--text-color)] mb-6 sm:mb-8 transition-colors duration-300 hover:text-indigo-600">
                  Share this article
                </h4>
                <ShareButtons shareUrl={shareUrl} shareTitle={article.title} />
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 sm:top-28">
              {/* Related Articles */}
              <section className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border-color)] p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-color)] mb-6 sm:mb-8 transition-colors duration-300 hover:text-indigo-600">
                  Related Articles
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {relatedArticles.loading ? (
                    <div className="animate-pulse space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 sm:gap-4">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--card-bg)] rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 sm:h-4 bg-[var(--border-color)] rounded w-1/4" />
                            <div className="h-3 sm:h-4 bg-[var(--border-color)] rounded w-3/4" />
                            <div className="h-3 sm:h-4 bg-[var(--border-color)] rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : relatedArticles.data.length > 0 ? (
                    relatedArticles.data.map((relatedArticle: ArticleType, index: number) => (
                      <Link
                        key={`related-article-${relatedArticle.slug}-${index}`}
                        href={`/article/${relatedArticle.slug}`}
                        className="group flex gap-4 sm:gap-6 hover:bg-[var(--card-bg)] p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 border border-[var(--border-color)]"
                      >
                        <Image
                          src={relatedArticle.thumbnail}
                          alt={relatedArticle.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs sm:text-sm text-indigo-600 font-medium mb-1 sm:mb-2 block group-hover:text-indigo-500 transition-colors">
                            {relatedArticle.category}
                          </span>
                          <h3 className="text-sm sm:text-base font-medium text-[var(--text-color)] group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h3>
                          <time className="text-xs sm:text-sm text-[var(--text-color)] mt-1 sm:mt-2 block">
                            {new Date(relatedArticle.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-[var(--text-color)] text-center py-4">No related articles found</p>
                  )}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}