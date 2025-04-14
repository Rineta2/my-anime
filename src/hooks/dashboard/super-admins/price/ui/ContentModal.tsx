import React from 'react';

import { PriceContent } from '@/hooks/dashboard/super-admins/price/types/Price';

interface ContentModalProps {
  formData: PriceContent;
  setFormData: React.Dispatch<React.SetStateAction<PriceContent>>;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const ContentModal: React.FC<ContentModalProps> = ({
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  isEditing,
}) => {
  const addList = () => {
    setFormData(prev => ({
      ...prev,
      list: [...prev.list, { title: '' }]
    }));
  };

  const removeList = (index: number) => {
    setFormData(prev => ({
      ...prev,
      list: prev.list.filter((_, i) => i !== index)
    }));
  };

  const updateBenefitTitle = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      list: prev.list.map((item, i) =>
        i === index ? { ...item, title: value } : item
      )
    }));
  };

  const closeModal = () => {
    const modal = document.getElementById('content_modal') as HTMLDialogElement;
    modal?.close();
  };

  return (
    <dialog id="content_modal" className="modal">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50">
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          <div className="bg-background w-full max-w-6xl rounded-3xl shadow-2xl p-6 lg:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text">
                {isEditing ? 'Edit Content' : 'Create New Content'}
              </h2>
              <p className="text-text-dark/70 mt-2">
                {isEditing ? 'Update your content information below' : 'Fill in the details to create new content'}
              </p>
            </div>

            <form
              method="dialog"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-8"
            >
              {/* Basic Information */}
              <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50">
                <h4 className="text-xl font-semibold text-text mb-6">Basic Information</h4>

                <div className="space-y-4">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-text-dark block">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                      required
                    />
                  </div>

                  {/* Original Price Field */}
                  <div className="space-y-2">
                    <label htmlFor="originalPrice" className="text-sm font-medium text-text-dark block">
                      Original Price
                    </label>
                    <input
                      type="text"
                      id="originalPrice"
                      value={formData.originalPrice ? formData.originalPrice.toLocaleString('id-ID') : ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, '');
                        setFormData(prev => ({
                          ...prev,
                          originalPrice: value ? Number(value) : null
                        }));
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, '');
                        if (value) {
                          const formattedValue = Number(value).toLocaleString('id-ID');
                          e.target.value = formattedValue;
                        }
                      }}
                      className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                      placeholder="Enter original price..."
                    />
                  </div>

                  {/* Label Discount Field */}
                  <div className="space-y-2">
                    <label htmlFor="labelDisc" className="text-sm font-medium text-text-dark block">
                      Label Discount
                    </label>
                    <input
                      type="text"
                      id="labelDisc"
                      value={formData.labelDisc || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, labelDisc: e.target.value || null }))}
                      className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                      placeholder="Enter discount label..."
                    />
                  </div>

                  {/* Discount Field */}
                  <div className="space-y-2">
                    <label htmlFor="discount" className="text-sm font-medium text-text-dark block">
                      Discount
                    </label>
                    <input
                      type="text"
                      id="discount"
                      value={formData.discount ? formData.discount.toLocaleString('id-ID') : ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, '');
                        setFormData(prev => ({
                          ...prev,
                          discount: value ? Number(value) : null
                        }));
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, '');
                        if (value) {
                          const formattedValue = Number(value).toLocaleString('id-ID');
                          e.target.value = formattedValue;
                        }
                      }}
                      className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                      placeholder="Enter discount amount..."
                    />
                  </div>
                </div>
              </div>

              {/* Benefits Sections */}
              <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50">
                <h4 className="text-xl font-semibold text-text mb-6">Benefits</h4>

                {/* Text Left Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold text-text">Text Left</h5>
                    <button
                      type="button"
                      onClick={addList}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20"
                    >
                      Add Title
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.list.map((item, index) => (
                      <div key={`left-${index}`} className="flex gap-4">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateBenefitTitle(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                          placeholder="Enter benefit title..."
                          required
                        />
                        {formData.list.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeList(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-text-dark hover:bg-background-dark rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update Content' : 'Create Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};