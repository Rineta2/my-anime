import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { ArticleCardProps } from '@/components/ui/article/types/article';

import { formatSlug } from '@/base/helper/FormatSlug';

import { motion } from 'framer-motion';

export default function ArticleCard({ article }: ArticleCardProps) {
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className='group bg-[var(--card-bg)] border-[var(--border-color)] border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/articles/${formatSlug(article.category)}/${formatSlug(article.slug)}`}>
        <div className="grid grid-cols-1 gap-0">
          <motion.div
            className="relative h-[200px] sm:h-[250px] w-full hover:scale-105 transition-all duration-300 overflow-hidden"
            transition={{ duration: 0.6 }}
          >
            <Image
              src={article?.thumbnail || ''}
              alt={article?.title || 'Article thumbnail'}
              className="w-full h-full object-cover"
              width={1200}
              height={400}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
            />
          </motion.div>

          <div className="p-8 flex flex-col justify-center">
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600"
              >
                {article?.category}
              </motion.span>
              <motion.time
                className="text-sm text-[var(--text-secondary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
              </motion.time>
            </motion.div>

            <motion.h3
              className="text-2xl font-bold mb-4 leading-tight line-clamp-1"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {article?.title}
            </motion.h3>

            <motion.p
              className="text-[var(--text-secondary)] text-lg mb-8 line-clamp-3"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {article?.description}
            </motion.p>

            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-start gap-4 p-4 bg-[var(--card-bg)] border-[var(--border-color)] border rounded-xl">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary">
                  <Image
                    src={article?.author?.photoURL || '/default-avatar.png'}
                    alt={article?.author?.name || 'Author'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{article?.author?.name}</p>
                  <p className="text-sm">{article?.author?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}