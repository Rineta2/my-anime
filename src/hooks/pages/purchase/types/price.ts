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
