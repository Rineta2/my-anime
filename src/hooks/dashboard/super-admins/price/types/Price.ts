interface ListItem {
  title: string;
}

export interface CardData {
  id: string;
  name: string;
  number: number;
  title: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceContent {
  id?: string;
  title: string;
  originalPrice?: number | null;
  labelDisc?: string | null;
  discount?: number | null;
  list: ListItem[];
  selectedCards: CardData[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: PriceContent;
  setFormData: (data: PriceContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
  cards: CardData[];
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
