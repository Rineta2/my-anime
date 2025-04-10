import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/AuthContext';
import { getUserHistory } from '@/hooks/dashboard/user/History/utils/getUserHistory';

interface HistoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

interface ViewHistory {
  title: string;
  poster: string;
  timestamp: number;
  href: string;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  const [history, setHistory] = useState<ViewHistory[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = getUserHistory(user.uid, (historyData) => {
        // Take the last 10 items for the modal
        setHistory(historyData.slice(0, 10));
      });

      return () => unsubscribe();
    }
  }, [user?.uid]);

  const handleViewAll = () => {
    router.push('/dashboard/user/history');
  };

  const handleLogin = () => {
    onClose();
    onLoginClick();
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  };

  return (
    <div className={`
      absolute top-full right-0 mt-2 w-80 bg-[var(--header-bg)] rounded-lg shadow-lg border border-[var(--header-border)] p-4
      transition-all duration-300 origin-top overflow-hidden
      ${isVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
    `}>
      <div className="space-y-4 h-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--text)]">Riwayat Tontonan</h3>
          {user && (
            <div
              role="button"
              tabIndex={0}
              className="text-xs text-primary hover:text-primary/80 transition-colors duration-300 cursor-pointer"
              onClick={handleViewAll}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleViewAll();
                }
              }}
            >
              Lihat Semua
            </div>
          )}
        </div>

        {!user ? (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--text-secondary)] mb-4">Silakan login untuk melihat riwayat tontonan</p>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-[var(--text-secondary)]">Belum ada riwayat tontonan</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Mulai menonton anime favoritmu</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-300 cursor-pointer"
                  onClick={() => router.push(item.href)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      router.push(item.href);
                    }
                  }}
                >
                  <Image
                    src={item.poster}
                    alt={item.title}
                    width={100}
                    height={60}
                    className="rounded-md object-cover w-[100px] h-[60px]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[var(--text)] truncate">{item.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {formatTimestamp(item.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal; 