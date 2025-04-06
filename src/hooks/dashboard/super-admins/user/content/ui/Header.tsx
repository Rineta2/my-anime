import React from 'react'

interface UserHeaderProps {
    onAddUser: () => void
}

export function UserHeader({ onAddUser }: UserHeaderProps) {
    return (
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-8 flex justify-between items-center">
            <div className='flex flex-col gap-1.5'>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Users List</h1>
                <p className="text-sm md:text-base">Manage and track your users</p>
            </div>

            <button
                onClick={onAddUser}
                className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center md:justify-start gap-2  hover:shadow-lg active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add User
            </button>
        </div>
    )
}