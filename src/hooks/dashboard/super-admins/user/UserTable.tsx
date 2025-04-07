import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { UserAccount, UserTableProps } from '@/hooks/dashboard/super-admins/user/types/users'

import { tableRowVariants, containerVariants } from '@/hooks/dashboard/super-admins/user/lib/animation'

import { formatPhoneNumberForDisplay } from '@/hooks/dashboard/super-admins/user/lib/Formatter'

export function UserTable({
    users,
    onDelete,
    onStatusChange,
    deletingUsers,
    updatingStatus
}: UserTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-[var(--card-bg)] backdrop-blur-sm">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200/80">
                    <thead className="bg-[var(--card-bg)] backdrop-blur-sm">
                        <tr>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold tracking-wider">Name</th>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold tracking-wider hidden md:table-cell">Email</th>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold tracking-wider">Phone</th>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold tracking-wider">Status</th>
                            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="divide-y divide-gray-100/80 bg-[var(--card-bg)]"
                    >
                        {users.map((user, index) => (
                            <UserTableRow
                                key={user.uid}
                                user={user}
                                index={index}
                                onDelete={onDelete}
                                onStatusChange={onStatusChange}
                                isDeleting={deletingUsers.includes(user.uid)}
                                isUpdating={updatingStatus.includes(user.uid)}
                            />
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    )
}

interface UserTableRowProps {
    user: UserAccount
    index: number
    onDelete: (uid: string) => void
    onStatusChange: (uid: string, isActive: boolean) => void
    isDeleting: boolean
    isUpdating: boolean
}

function UserTableRow({
    user,
    index,
    onDelete,
    onStatusChange,
    isDeleting,
    isUpdating
}: UserTableRowProps) {
    return (
        <motion.tr
            variants={tableRowVariants}
            custom={index}
        >
            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    {user.photoURL ? (
                        <Image
                            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-2xl object-cover border border-gray-100/80 shadow-sm"
                            src={user.photoURL}
                            alt={user.displayName}
                            width={48}
                            height={48}
                        />
                    ) : (
                        <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100/80">
                            <span className="text-sm sm:text-base md:text-lg font-medium">{user.displayName?.[0]}</span>
                        </div>
                    )}
                    <div>
                        <div className="text-xs sm:text-sm md:text-base font-medium">{user.displayName}</div>
                        <div className="text-xs text-gray-500 md:hidden">{user.email}</div>
                        <div className="text-xs text-gray-500 md:hidden">
                            {user.phoneNumber ? formatPhoneNumberForDisplay(user.phoneNumber) : 'No phone number'}
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                <span className="text-xs sm:text-sm">{user.email}</span>
            </td>

            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                <span className="text-xs sm:text-sm">
                    {user.phoneNumber ? formatPhoneNumberForDisplay(user.phoneNumber) : 'No phone number'}
                </span>
            </td>

            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                <span className={`px-2 sm:px-3 py-1 sm:py-1.5 inline-flex text-xs leading-4 sm:leading-5 font-medium rounded-full transition-colors duration-200 ${user.isActive
                    ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                    : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                    }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                </span>
            </td>

            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <div className="form-control">
                        <select
                            value={user.isActive ? 'active' : 'inactive'}
                            onChange={() => onStatusChange(user.uid, user.isActive)}
                            disabled={isUpdating}
                            className={`select select-bordered select-xs sm:select-sm bg-[var(--card-bg)] ${isUpdating ? 'select-disabled' : ''}`}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button
                        onClick={() => onDelete(user.uid)}
                        disabled={isDeleting}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${isDeleting
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-50 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                            }`}
                    >
                        {isDeleting ? (
                            <div className="flex items-center gap-1">
                                <svg className="animate-spin h-3 w-3 sm:h-3.5 sm:w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="hidden sm:inline">Deleting...</span>
                            </div>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </td>
        </motion.tr>
    )
}