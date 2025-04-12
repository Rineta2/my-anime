"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import InsplensiasiSkelaton from '@/hooks/dashboard/super-admins/Profile/profile/ProfileSkelaton'

import { PotensiSponsorContent } from '@/hooks/dashboard/super-admins/price/types/Price'

import { ContentModal } from '@/hooks/dashboard/super-admins/price/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/price/ui/DeleteModal'

import { usePotensiSponsorData } from '@/hooks/dashboard/super-admins/price/lib/UseManagementPrice'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

const initialFormData: PotensiSponsorContent = {
  title: '',
  imageUrl: '',
  list: [{
    title: '',
  }],
};

export default function PriceLayout() {
  const {
    isLoading,
    potensiSponsor,
    isSubmitting,
    setIsSubmitting,
    handleImageUpload,
    createContent,
    handleUpdate,
    handleDelete,
  } = usePotensiSponsorData();

  const [formData, setFormData] = useState<PotensiSponsorContent>(initialFormData)

  const [isEditing, setIsEditing] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      if (isEditing && editingId) {
        await handleUpdate(editingId, formData)
        toast.success('Content updated successfully!')
      } else {
        await createContent(formData)
        toast.success('Content created successfully!')
      }

      resetForm()
      closeContentModal()
    } catch (error) {
      console.error('Error submitting content:', error)
      toast.error('Failed to save content. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormData(initialFormData)
  }

  const closeContentModal = () => {
    const modal = document.getElementById('content_modal') as HTMLDialogElement | null
    modal?.close()
  }

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
    return <InsplensiasiSkelaton />
  }
  return (
    <section className='min-h-screen'>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-1"
        >
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='text-xl sm:text-2xl md:text-3xl font-bold'
          >
            Price list
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-sm sm:text-base"
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
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
          onClick={() => {
            setIsEditing(false)
            setEditingId(null)
            setFormData(initialFormData)
            const modal = document.getElementById('content_modal') as HTMLDialogElement
            modal?.showModal()
          }}
        >
          <motion.svg
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </motion.svg>
          Add Price
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {potensiSponsor.map((content) => (
          <div
            key={content.id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Image Header */}
            <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
              {content.imageUrl ? (
                <Image
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={500}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {/* Floating Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4">
                <h2 className='text-xl font-bold text-gray-800'>
                  {content.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Benefits & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Text */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Benefits</h3>
                    <ul className="space-y-2">
                      {content.list.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setDeleteId(content.id!)
                      const modal = document.getElementById('delete_modal') as HTMLDialogElement
                      modal?.showModal()
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 
                                        rounded-xl transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        title: content.title,
                        imageUrl: content.imageUrl || '',
                        list: content.list || [{ title: '' }],
                      })
                      setIsEditing(true)
                      setEditingId(content.id || null)
                      const modal = document.getElementById('content_modal') as HTMLDialogElement
                      modal?.showModal()
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 
                                        rounded-xl transition-colors duration-200"
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

      {/* Empty State */}
      {potensiSponsor.length === 0 && (
        <div className="text-center bg-white rounded-2xl shadow-md p-4 sm:p-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No Content Yet</h3>
          <p className="text-gray-500">Create your first content to get started</p>
        </div>
      )}

      {/* Content Modal */}
      {typeof ContentModal === 'function' && (
        <ContentModal
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
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
