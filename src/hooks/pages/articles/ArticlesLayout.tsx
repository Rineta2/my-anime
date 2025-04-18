"use client"

import React from 'react';

import Pagination from '@/base/helper/Pagination';

import ArticleSkeleton from '@/hooks/pages/articles/ArticlesSkeleton';

import { motion, AnimatePresence } from 'framer-motion';

import { SearchModal } from '@/hooks/pages/articles/components/SearchModal';

import { TopArticle } from '@/hooks/pages/articles/components/TopArticles';

import { CategoryFilter } from '@/hooks/pages/articles/components/CategoryFilter';

import { ArticleCard } from '@/hooks/pages/articles/components/ArticeCard';

import { useManagementArticle } from '@/hooks/pages/articles/lib/useManagementArticles';

export default function ArticleLayout() {

  const {
    articles,
    loading,
    selectedCategory,
    searchQuery,
    searchResults,
    currentPage,
    topArticle,
    paginatedArticles,
    totalPages,
    setSelectedCategory,
    handleSearch,
    handleSearchResultClick,
    handlePageChange,
    handleModalOpen,
    handleModalClose,
  } = useManagementArticle();

  if (loading) {
    return <ArticleSkeleton />;
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-full py-10'
    >
      <div className="container mx-auto px-3 sm:px-4 xl:px-10">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 mb-6 sm:mb-8'>
          <CategoryFilter
            articles={articles}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className='search-filter w-full sm:w-auto'>
            <button
              onClick={handleModalOpen}
              className="w-full sm:w-64 pl-8 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-full flex items-center gap-2 sm:gap-3 hover:border-blue-500 hover:shadow-md transition-all duration-300 bg-white text-gray-400"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm sm:text-base">Search articles...</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          <SearchModal
            searchQuery={searchQuery}
            searchResults={searchResults}
            handleSearch={handleSearch}
            handleSearchResultClick={handleSearchResultClick}
            handleModalClose={handleModalClose}
          />
        </AnimatePresence>

        {topArticle && <TopArticle article={topArticle} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className='mt-8 sm:mt-12'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </motion.section>
  );
}