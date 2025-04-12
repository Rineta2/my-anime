import React from 'react';
import { IoDiamond } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { MdHd } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineBlock } from "react-icons/md";
import { useAuth } from '@/utils/context/AuthContext';

interface PremiumModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isVisible, onClose, onLoginClick }) => {
  const { user } = useAuth();

  const handlePremiumClick = () => {
    if (!user) {
      onClose();
      onLoginClick();
    } else {
      // Handle premium subscription logic here
      console.log('Navigate to premium subscription page');
    }
  };

  return (
    <div className={`
      absolute top-full right-0 mt-2 w-72 bg-[var(--header-bg)] rounded-lg shadow-lg border border-[var(--header-border)] p-4
      transition-all duration-300 origin-top
      ${isVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
    `}>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[var(--text)]">Keuntungan Premium</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <IoDiamond className="w-5 h-5 text-primary" />
            <span className="text-sm text-[var(--text)]">Konten Premium</span>
          </div>

          <div className="flex items-center gap-3">
            <IoTimeOutline className="w-5 h-5 text-primary" />
            <span className="text-sm text-[var(--text)]">Lebih awal</span>
          </div>

          <div className="flex items-center gap-3">
            <MdHd className="w-5 h-5 text-primary" />
            <span className="text-sm text-[var(--text)]">Resolusi HD</span>
          </div>

          <div className="flex items-center gap-3">
            <IoPhonePortraitOutline className="w-5 h-5 text-primary" />
            <span className="text-sm text-[var(--text)]">Multi perangkat</span>
          </div>

          <div className="flex items-center gap-3">
            <IoDownloadOutline className="w-5 h-5 text-primary" />
            <span className="text-sm text-[var(--text)]">Gratis unduh</span>
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineBlock className="w-5 h-5 text-primary" />
            <span className="text-sm text-[var(--text)]">Lewati iklan</span>
          </div>
        </div>

        <button
          onClick={handlePremiumClick}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 text-sm font-medium"
        >
          {!user ? 'Login untuk Premium' : 'Jadi Premium'}
        </button>
      </div>
    </div>
  );
};

export default PremiumModal; 