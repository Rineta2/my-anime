import React from 'react'

import { UserHeaderProps, UserFiltersProps, EmptyStateProps } from "@/hooks/dashboard/super-admins/user/types/users"

export function UserHeader({ onAddUser }: UserHeaderProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-8 flex justify-between items-center">
      <div className='flex flex-col gap-1.5'>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Users List</h1>
        <p className="text-sm md:text-base">Manage and track your users</p>
      </div>

      <button
        onClick={onAddUser}
        className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center md:justify-start gap-2 hover:shadow-lg active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add User
      </button>
    </div>
  )
}

export function UserFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: UserFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="w-full px-4 py-2.5 rounded-xl border bg-[var(--card-bg)] border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="w-full md:w-48">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
          className="w-full px-4 py-2.5 rounded-xl border bg-[var(--card-bg)] border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  )
}

export function EmptyState({ handleBack }: EmptyStateProps) {
  return (
    <section className='min-h-full px-0 sm:px-2'>
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <svg
          className="w-48 h-48 mb-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            className="fill-primary/10 stroke-primary"
            strokeWidth="1.5"
          />
          <path
            d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21"
            className="stroke-primary"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="space-y-4">
          <h1 className='text-2xl sm:text-3xl font-bold'>
            Belum ada user
          </h1>

          <p className='text-sm sm:text-base max-w-md mx-auto'>
            Tidak ada user yang terdaftar.
            Silakan lakukan pendaftaran user untuk melihat daftar user.
          </p>

          <button onClick={handleBack} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/20 transition-all duration-300 font-medium">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke halaman utama
          </button>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[40%] top-[20%] h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute right-[30%] bottom-[10%] h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
} 