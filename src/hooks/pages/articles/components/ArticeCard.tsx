import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { ArticleCardProps } from '@/components/ui/article/types/article';

import { motion } from 'framer-motion';

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm rounded-md'
    >
      <Link href={`/articles/${article.slug}`}
        className="group rounded-2xl overflow-hidden">
        <div className="w-full h-[200px] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={500}
            height={500}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6">
          <span className="text-blue-600 text-xs font-medium tracking-wider uppercase">
            {article.category}
          </span>
          <h2 className="text-xl font-bold mt-2 mb-3 line-clamp-1">
            {article.title}
          </h2>
          <p className="text-sm line-clamp-3 mb-6">
            {article.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src={article.author.photoURL}
                  alt={article.author.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs">{article.author.role}</p>
              </div>
            </div>
            <p className="text-xs italic">
              {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}