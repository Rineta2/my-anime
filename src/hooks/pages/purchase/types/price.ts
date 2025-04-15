export interface Card {
  createdAt: string;
  id: string;
  imageUrl: string;
  name: string;
  number: number;
  title: string;
  updatedAt: string;
}

export interface ListItem {
  title: string;
}

export interface Price {
  id: string;
  createdAt: string;
  discount: string;
  labelDisc: null;
  list: ListItem[];
  originalPrice: null;
  title: string;
  updatedAt: string;
}

// Cards

export interface CardData {
  id: number;
  name: string;
  icons: React.ReactNode;
}

// User

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
}

// Payment Modal

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: string | null;
  selectedPriceAmount?: number;
  selectedPackage?: {
    title: string;
    discount: number;
    labelDisc?: string;
    originalPrice?: number;
  };
}
