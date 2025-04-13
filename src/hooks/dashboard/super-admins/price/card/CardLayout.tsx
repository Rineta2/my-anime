"use client"

import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import CardSkelaton from '@/hooks/dashboard/super-admins/price/card/CardSkelaton'

import { CardContent } from '@/hooks/dashboard/super-admins/price/card/types/Card'

import { ContentModal } from '@/hooks/dashboard/super-admins/price/card/modal/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/price/card/modal/DeleteModal'

import { useCardData } from '@/hooks/dashboard/super-admins/price/card/lib/FetchCard'

const initialFormData: CardContent = {
  title: '',
  name: '',
  number: 0,
  imageUrl: '',
};

export default function CardLayout() {
  const {
    isLoading,
    contents,
    isSubmitting,
    setIsSubmitting,
    handleImageUpload,
    createContent,
    handleUpdate,
    handleDelete,
  } = useCardData();

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const [formData, setFormData] = useState<CardContent>(initialFormData)

  const [isEditing, setIsEditing] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      let imageUrl = formData.imageUrl
      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage)
      }

      if (isEditing && editingId) {
        await handleUpdate(editingId, {
          ...formData,
          imageUrl: selectedImage ? imageUrl : formData.imageUrl
        })
        toast.success('Content updated successfully!')
      } else {
        await createContent(formData, imageUrl)
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
    setSelectedImage(null)
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

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedImage));
      }
    };
  }, [selectedImage]);

  if (isLoading) {
    return <CardSkelaton />
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='min-h-full px-0 sm:px-2'
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="space-y-2">
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
              Card Management
            </h1>
            <p className='text-sm sm:text-base'>Manage your card content and settings</p>
          </div>

          <button
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
            onClick={() => {
              setIsEditing(false)
              setEditingId(null)
              setFormData(initialFormData)
              setSelectedImage(null)
              const modal = document.getElementById('content_modal') as HTMLDialogElement | null
              modal?.showModal()
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Content
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Content Display */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          contents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.1
              }}
              className='w-full bg-[var(--card-bg)] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[var(--border-color)] group'
            >
              <div className="flex flex-col gap-0">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[250px] bg-card overflow-hidden"
                >
                  <Image
                    src={content.imageUrl}
                    alt={content.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-6 flex flex-col justify-center bg-card/50 backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className='text-xl font-semibold text-text'>
                        {content.title}
                      </h2>

                      <h3 className='text-lg text-primary font-medium'>
                        {content.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                      <span className="text-sm text-text-dark/70">Number:</span>
                      <h3 className='text-lg text-primary font-medium'>
                        {content.number}
                      </h3>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/30">
                      <button
                        onClick={() => {
                          setDeleteId(content.id!)
                          const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                          deleteModal?.showModal()
                        }}
                        className="flex-1 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setFormData(content)
                          setIsEditing(true)
                          setEditingId(content.id || null)
                          const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                          modal?.showModal()
                        }}
                        className="flex-1 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))
        }
      </div>

      <ContentModal
        formData={formData}
        setFormData={setFormData}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
      />

      <DeleteModal
        onDelete={handleDeleteConfirm}
        isSubmitting={isSubmitting}
        onClose={closeDeleteModal}
      />
    </motion.section>
  );
}