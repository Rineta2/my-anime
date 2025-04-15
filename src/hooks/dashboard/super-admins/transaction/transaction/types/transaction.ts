import { Timestamp } from "firebase/firestore";

export interface TransactionDetailsProps {
  transaction: {
    id: string;
    amount: number;
    card: {
      imageUrl: string;
      name: string;
      title: string;
    };
    createdAt: Timestamp;
    proofOfPayment: string;
    selectedPackage: {
      discount: number;
      labelDisc: string;
      originalPrice: number;
      title: string;
    };
    status: string;
    transactionLink: string;
    updatedAt: Timestamp;
    user: {
      nama: string;
      photoURL: string;
      uid: string;
    };
  };
}

export interface Transaction {
  id: string;
  amount: number;
  card: {
    imageUrl: string;
    name: string;
    title: string;
  };
  createdAt: Timestamp;
  proofOfPayment: string;
  selectedPackage: {
    discount: number;
    labelDisc: string;
    originalPrice: number;
    title: string;
  };
  status: string;
  transactionLink: string;
  updatedAt: Timestamp;
  user: {
    nama: string;
    photoURL: string;
    uid: string;
  };
}
