"use client";

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import { FetchArticle } from '@/components/ui/article/lib/FetchArticle';


import { ArticleType } from '@/components/ui/article/types/article';

import ArticleSkelaton from '@/components/ui/article/ArticleSkelaton';

import TopArticle from '@/components/ui/article/components/TopArticle';

import ArticleCard from '@/components/ui/article/components/ArticleCard';

export default function Article() {
  const [article, setArticle] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleViewAll = () => {
    router.push("/articles");
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
      className='min-h-full px-4 sm:px-8 py-10'
    >
      <div className="container">
        <motion.div
          variants={itemVariants}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Latest Articles
          </motion.h2>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gray-900 rounded-lg overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              View All Articles
              <motion.svg
                className="w-4 h-4"
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
            </span>
          </motion.button>
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