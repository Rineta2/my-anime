"use client";

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { FetchArticle } from '@/components/ui/article/lib/FetchArticle';

import { ArticleType } from '@/components/ui/article/types/article';

import ArticleSkelaton from '@/components/ui/article/ArticleSkelaton';

import TopArticle from '@/components/ui/article/components/TopArticle';

import ArticleCard from '@/components/ui/article/components/ArticleCard';

import Link from 'next/link';

export default function Article() {
  const [article, setArticle] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FetchArticle((newArticle) => {
      const sortedArticles = newArticle.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setArticle(sortedArticles);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ArticleSkelaton />;
  }

  const limitedArticles = article.slice(0, 8);
  const topArticles = limitedArticles.length > 0 ? limitedArticles.slice(0, 2) : [];
  const otherArticles = limitedArticles.length > 2 ? limitedArticles.slice(2) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className='min-h-full py-10'
    >
      <div className="container px-4 sm:px-8">
        <motion.div
          variants={itemVariants}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Latest Articles
          </motion.h1>

          <Link href={"/articles"} className='flex items-center text-sm text-[var(--text-secondary)]'>
            Lihat Semua
            <motion.svg
              className="w-4 h-4 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>

        {topArticles.length > 0 && (
          <motion.div
            variants={itemVariants}
            viewport={{ once: true }}
            className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {topArticles.map((article, index) => (
              <TopArticle key={index} article={article} />
            ))}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {otherArticles.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <ArticleCard article={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}