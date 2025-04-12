interface list {
  title: string;
}

export interface PotensiSponsorContent {
  id?: string;
  title: string;
  imageUrl: string;
  list: list[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: PotensiSponsorContent;
  setFormData: (data: PotensiSponsorContent) => void;
  handleSubmit: () => void;
  handleImageUpload: (file: File) => Promise<string>;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
