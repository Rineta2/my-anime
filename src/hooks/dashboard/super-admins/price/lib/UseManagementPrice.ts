"use client";

import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase/firebase";

import imagekitInstance from "@/utils/imgkit/Imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

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

interface ListItem {
  title: string;
}

export const usePriceData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState<PriceContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRICE as string)
      );
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PriceContent[];
      setPrice(contentArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });

      const base64 = await base64Promise;
      const result = await imagekitInstance.upload({
        file: base64,
        fileName: `price-${Date.now()}`,
        folder: "/price",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const createContent = async (data: PriceContent) => {
    const newContent = {
      createdAt: new Date(),
      discount: data.discount || null,
      labelDisc: data.labelDisc || null,
      list: data.list.map((item) => ({ title: item.title })),
      originalPrice: data.originalPrice || null,
      title: data.title,
      updatedAt: new Date(),
    };

    await addDoc(
      collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRICE as string),
      newContent
    );
    await fetchContents();
  };

  const handleUpdate = async (id: string, updatedData: PriceContent) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRICE as string,
        id
      );

      const updatedContent = {
        discount: updatedData.discount || null,
        labelDisc: updatedData.labelDisc || null,
        list: updatedData.list.map((item) => ({ title: item.title })),
        originalPrice: updatedData.originalPrice || null,
        title: updatedData.title,
        updatedAt: new Date(),
      };

      await updateDoc(docRef, updatedContent);
      await fetchContents();
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRICE as string,
        id
      );
      await deleteDoc(docRef);
      await fetchContents();
      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return {
    isLoading,
    price,
    isSubmitting,
    setIsSubmitting,
    handleImageUpload,
    createContent,
    handleUpdate,
    handleDelete,
    fetchContents,
  };
};
