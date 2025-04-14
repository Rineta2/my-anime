"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import PriceSkelaton from '@/hooks/dashboard/super-admins/price/PriceSkelaton'

import { PriceContent } from '@/hooks/dashboard/super-admins/price/types/Price'

import { ContentModal } from '@/hooks/dashboard/super-admins/price/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/price/ui/DeleteModal'

import { usePriceData } from '@/hooks/dashboard/super-admins/price/lib/UseManagementPrice'

import { toast } from 'react-hot-toast'

export default function PriceLayout() {
  const {
    isLoading,
    price,
    isSubmitting,
    setIsSubmitting,
    createContent,
    handleUpdate,
    handleDelete,
  } = usePriceData();

  const [formData, setFormData] = useState<PriceContent>({
    title: "",
    originalPrice: null,
    labelDisc: "",
    discount: null,
    list: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (isEditing && editingId) {
        await handleUpdate(editingId, formData);
        toast.success('Content updated successfully!');
      } else {
        await createContent(formData);
        toast.success('Content created successfully!');
      }
      setFormData({
        title: "",
        originalPrice: null,
        labelDisc: "",
        discount: null,
        list: [],
      });
      setIsEditing(false);
      setEditingId("");
      const modal = document.getElementById('content_modal') as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Failed to save content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const content = price.find((item) => item.id === id);
    if (content) {
      setFormData({
        title: content.title,
        originalPrice: content.originalPrice || null,
        labelDisc: content.labelDisc || '',
        discount: content.discount || null,
        list: content.list || [],
      });
      setIsEditing(true);
      setEditingId(id);
      const modal = document.getElementById('content_modal') as HTMLDialogElement;
      modal?.showModal();
    }
  };

  const handleCreate = () => {
    setFormData({
      title: "",
      originalPrice: null,
      labelDisc: "",
      discount: null,
      list: [],
    });
    setIsEditing(false);
    setEditingId("");
    const modal = document.getElementById('content_modal') as HTMLDialogElement;
    modal?.showModal();
  };

  const closeDeleteModal = () => {
    const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
    modal?.close()
  }

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await handleDelete(deleteId)
      closeDeleteModal()
    }
  }

  if (isLoading) {
    return <PriceSkelaton />
  }
  return (
    <section className='min-h-screen'>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--card-bg)] rounded-2xl shadow-lg border border-[var(--border-color)] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='text-3xl sm:text-4xl font-bold'
          >
            Price list
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-base sm:text-lg"
          >
            Manage and showcase your price list
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base font-medium"
          onClick={handleCreate}
        >
          <motion.svg
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </motion.svg>
          Add Price
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {price.map((content) => (
          <div
            key={content.id}
            className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] transition-all duration-300 overflow-hidden group hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-text">{content.title}</h3>
                    {content.labelDisc && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 rounded-full">
                        {content.labelDisc}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    {content.discount && (
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Rp {Number(content.discount).toLocaleString('id-ID')}
                      </span>
                    )}
                    {content.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        Rp {Number(content.originalPrice).toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Benefits</h4>
                  <ul className="space-y-3">
                    {content.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 dark:bg-blue-500 flex-shrink-0" />
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => {
                      setDeleteId(content.id!)
                      const modal = document.getElementById('delete_modal') as HTMLDialogElement
                      modal?.showModal()
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(content.id!)
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {price.length === 0 && (
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Content Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Create your first content to get started</p>
        </div>
      )}

      {/* Content Modal */}
      {typeof ContentModal === 'function' && (
        <ContentModal
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
        />
      )}

      {/* Delete Modal */}
      {typeof DeleteModal === 'function' && (
        <DeleteModal
          onDelete={handleDeleteConfirm}
          isSubmitting={isSubmitting}
          onClose={closeDeleteModal}
        />
      )}
    </section>
  )
}
