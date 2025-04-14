interface ListItem {
  title: string;
}

export interface PriceContent {
  id?: string;
  title: string;
  originalPrice?: number | null;
  labelDisc?: string | null;
  discount?: number | null;
  list: ListItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: PriceContent;
  setFormData: (data: PriceContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
