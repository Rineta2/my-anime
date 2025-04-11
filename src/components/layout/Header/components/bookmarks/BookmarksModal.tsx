import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { useAuth } from '@/utils/context/AuthContext';

import { BookmarkModalProps } from '@/types/bookmark';

import Link from 'next/link';

import Image from 'next/image';

import { FaTrash } from 'react-icons/fa';

import { motion } from 'framer-motion';

const formatTimestamp = (timestamp: number) => {
  return format(new Date(timestamp), 'dd/MM/yyyy HH:mm', { locale: id });
};

const BookmarksModal: React.FC<BookmarkModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  const { user, bookmarks, removeFromBookmarks } = useAuth();

  const handleRemoveBookmark = async (bookmarkId: string) => {
    await removeFromBookmarks(bookmarkId);
  };

  const handleLogin = () => {
    onClose();
    onLoginClick();
  };

  if (!isVisible) return null;

  return (
    <div className="relative">
      <div className={`
        absolute top-full right-0 mt-2 w-80 bg-[var(--header-bg)] rounded-lg shadow-lg border border-[var(--header-border)] p-4 z-50
        transition-all duration-300 origin-top overflow-hidden
        ${isVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
      `}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--text)]">Bookmark Saya</h3>

            <Link href="/dashboard/user/bookmarks" className="text-xs text-primary hover:text-primary/80 transition-colors duration-300 cursor-pointer">
              Lihat Semua
            </Link>
          </div>

          {!user ? (
            <div className="text-center py-8">
              <p className="text-sm text-[var(--text-secondary)] mb-4">Silakan login untuk melihat bookmark</p>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          ) : Object.keys(bookmarks).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-[var(--text-secondary)]">Belum ada anime yang di-bookmark</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(bookmarks).map(([id, bookmark], index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-[var(--card-bg)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    <Image
                      src={bookmark.poster}
                      alt={bookmark.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={bookmark.href}
                      className="block text-sm font-medium text-[var(--text)] hover:text-primary truncate"
                    >
                      {bookmark.title}
                    </Link>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Ditambahkan pada {formatTimestamp(bookmark.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveBookmark(id)}
                    className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors duration-300"
                  >
                    <FaTrash size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksModal; 