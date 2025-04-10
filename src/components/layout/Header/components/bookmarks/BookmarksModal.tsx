import React from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { BookmarkModalProps } from '@/types/bookmark';

const BookmarksModal: React.FC<BookmarkModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  const { user } = useAuth();

  const handleLogin = () => {
    onClose();
    onLoginClick();
  };

  return (
    <div className={`
      absolute top-full right-0 mt-2 w-80 bg-[var(--header-bg)] rounded-lg shadow-lg border border-[var(--header-border)] p-4
      transition-all duration-300 origin-top
      ${isVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
    `}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--text)]">Bookmark Saya</h3>
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
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--text-secondary)]">Fitur bookmark sedang dalam pengembangan</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Mohon maaf atas ketidaknyamanannya</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksModal; 