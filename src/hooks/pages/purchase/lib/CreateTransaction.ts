import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import imagekitInstance from "@/utils/imgkit/Imagekit";
import { auth } from "@/utils/firebase/firebase";

interface UserProfile {
  nama: string;
  photoURL: string;
  uid: string;
}

interface PaymentCard {
  imageUrl: string;
  title: string;
  name: string;
}

interface PackageDetails {
  title: string;
  discount: number;
  labelDisc?: string | null;
  originalPrice?: number | null;
}

interface TransactionData {
  user: UserProfile;
  card: PaymentCard;
  selectedPackage: PackageDetails;
  amount: number;
  status: "pending" | "success" | "failed";
  proofOfPayment: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  transactionLink: string | null;
}

export async function CreateTransaction(
  data: Omit<
    TransactionData,
    "proofOfPayment" | "createdAt" | "updatedAt" | "transactionLink"
  >
) {
  try {
    const transactionRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string
    );

    const newTransaction = {
      ...data,
      proofOfPayment: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      transactionLink: null,
    };

    const docRef = await addDoc(transactionRef, newTransaction);

    const transactionLink = `/payment-status/${docRef.id}`;
    await updateDoc(docRef, {
      transactionLink,
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error };
  }
}

export async function UploadProofOfPayment(transactionId: string, file: File) {
  try {
    // Convert File to base64
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const base64 = await base64Promise;

    // Upload image to ImageKit
    const uploadResponse = await imagekitInstance.upload({
      file: base64, // base64 string is valid for ImageKit upload
      fileName: `proof_${transactionId}_${Date.now()}`,
      folder: "/proof-of-payment",
    });

    // Update transaction with proof URL
    const transactionRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string,
      transactionId
    );

    // Wait for the upload to complete and get the URL
    const imageUrl = uploadResponse.url;

    await updateDoc(transactionRef, {
      proofOfPayment: imageUrl,
      updatedAt: serverTimestamp(),
    });

    return { success: true, url: imageUrl };
  } catch (error) {
    console.error("Error uploading proof:", error);
    return { success: false, error };
  }
}

export async function UpdateTransactionStatus(
  transactionId: string,
  status: "pending" | "success" | "failed",
  isAdminOrSuperAdmin: boolean
) {
  try {
    const transactionRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string,
      transactionId
    );

    // Get current transaction data
    const transactionDoc = await getDoc(transactionRef);
    if (!transactionDoc.exists()) {
      return { success: false, error: "Transaksi tidak ditemukan" };
    }

    const transactionData = transactionDoc.data();

    // Check if user is admin/super admin or the owner of the transaction
    if (
      !isAdminOrSuperAdmin &&
      transactionData.userId !== auth.currentUser?.uid
    ) {
      return {
        success: false,
        error: "Anda tidak memiliki akses untuk mengupdate transaksi ini",
      };
    }

    // Update transaction status
    await updateDoc(transactionRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return { success: false, error };
  }
}

export async function UpdateTransactionWithLink(transactionId: string) {
  try {
    const transactionRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTION as string,
      transactionId
    );

    const transactionLink = `/payment-status/${transactionId}`;
    await updateDoc(transactionRef, {
      transactionLink,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating transaction with link:", error);
    return { success: false, error };
  }
}
