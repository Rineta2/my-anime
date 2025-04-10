"use client"

import React, { useState } from 'react'

import { CiLogin } from 'react-icons/ci'

import { FaRegUser, FaHistory } from "react-icons/fa"

import { FaBookmark } from "react-icons/fa6";

import { IoIosArrowDown } from 'react-icons/io'

import { FiSearch, FiMenu, FiX } from 'react-icons/fi'

import Image from "next/image"

import { useAuth } from "@/utils/context/AuthContext"

import LoginModal from "@/components/layout/Header/auth/signin/LoginModal"

import ProfileMenu from "./components/ProfileMenu"

import ThemeToggle from "./components/ThemeToggle"

import ThemeModal from "./ThemeModal"

import { IoDiamond } from "react-icons/io5";

import PremiumModal from './components/premium/PremiumModal';

import HistoryModal from './components/history/HistoryModal'

import BookmarksModal from './components/bookmarks/BookmarksModal'

interface HeaderProps {
    isCollapsed: boolean;
    isMobile: boolean;
    onToggleSidebar?: () => void;
    isSidebarOpen?: boolean;
}

export default function Header({ isCollapsed, isMobile, onToggleSidebar, isSidebarOpen }: HeaderProps) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);
    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [isBookmarksModalVisible, setIsBookmarksModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { user } = useAuth();

    const handleProfileToggle = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    const handleThemeToggle = () => {
        setIsThemeModalOpen(true);
    };

    return (
        <>
            <header className={`
                fixed top-0 right-0 
                ${isMobile ? 'w-full left-0' : isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-15rem)]'} 
                h-16 bg-[var(--header-bg)] backdrop-blur-md shadow-[0_4px_20px_var(--header-shadow)] z-40 border-b border-[var(--header-border)]
            `}>
                <div className="h-full px-4 lg:px-6">
                    <div className="flex items-center justify-between h-full gap-4">
                        {/* Mobile Hamburger */}
                        {isMobile && (
                            <button
                                onClick={onToggleSidebar}
                                className="p-2 -ml-2 rounded-lg hover:bg-[var(--hover-bg)] transition-all duration-300 group"
                                aria-label="Toggle menu"
                            >
                                {isSidebarOpen ? (
                                    <FiX className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-primary transition-all duration-300" />
                                ) : (
                                    <FiMenu className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-primary transition-all duration-300" />
                                )}
                            </button>
                        )}

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 sm:mx-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search anime..."
                                    className="w-full h-10 pl-10 pr-4 bg-transparent text-[var(--text)] placeholder-[var(--text-secondary)] border-b border-[var(--header-border)] focus:border-primary transition-all duration-300 outline-none text-sm"
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                            </div>
                        </form>

                        {/* Right Section */}
                        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsPremiumModalVisible(true)}
                                onMouseLeave={() => setIsPremiumModalVisible(false)}
                            >
                                <div className="flex items-center gap-1 px-2 sm:px-3 py-2 bg-primary hover:bg-primary/90 rounded-lg cursor-pointer">
                                    <IoDiamond className="w-4 h-4 text-white" />
                                    <span className="hidden sm:block text-sm font-medium text-white">Premium</span>
                                </div>
                                <PremiumModal
                                    isVisible={isPremiumModalVisible}
                                    onClose={() => setIsPremiumModalVisible(false)}
                                    onLoginClick={() => setIsLoginModalOpen(true)}
                                />
                            </div>

                            {/* Actions */}
                            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setIsHistoryModalVisible(true)}
                                    onMouseLeave={() => setIsHistoryModalVisible(false)}
                                >
                                    <div className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300 group cursor-pointer">
                                        <FaHistory className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-primary transition-colors duration-300" />
                                        <span className="text-sm font-medium text-[var(--text)] group-hover:text-primary transition-colors duration-300">History</span>
                                    </div>
                                    <HistoryModal
                                        isVisible={isHistoryModalVisible}
                                        onClose={() => setIsHistoryModalVisible(false)}
                                        onLoginClick={() => setIsLoginModalOpen(true)}
                                    />
                                </div>

                                <div
                                    className="relative group"
                                    onMouseEnter={() => setIsBookmarksModalVisible(true)}
                                    onMouseLeave={() => setIsBookmarksModalVisible(false)}
                                >
                                    <div className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300 group cursor-pointer">
                                        <FaBookmark className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-primary transition-colors duration-300" />
                                        <span className="text-sm font-medium text-[var(--text)] group-hover:text-primary transition-colors duration-300">Bookmarks</span>
                                    </div>
                                    <BookmarksModal
                                        isVisible={isBookmarksModalVisible}
                                        onClose={() => setIsBookmarksModalVisible(false)}
                                        onLoginClick={() => setIsLoginModalOpen(true)}
                                    />
                                </div>
                            </div>

                            {/* Mobile Actions */}
                            <div className="flex sm:hidden items-center gap-1">
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHistoryModalVisible(true)}
                                    onMouseLeave={() => setIsHistoryModalVisible(false)}
                                >
                                    <div className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300 cursor-pointer">
                                        <FaHistory className="w-4 h-4 text-[var(--text-secondary)]" />
                                    </div>
                                    <HistoryModal
                                        isVisible={isHistoryModalVisible}
                                        onClose={() => setIsHistoryModalVisible(false)}
                                        onLoginClick={() => setIsLoginModalOpen(true)}
                                    />
                                </div>
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsBookmarksModalVisible(true)}
                                    onMouseLeave={() => setIsBookmarksModalVisible(false)}
                                >
                                    <div className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300 cursor-pointer">
                                        <FaBookmark className="w-4 h-4 text-[var(--text-secondary)]" />
                                    </div>
                                    <BookmarksModal
                                        isVisible={isBookmarksModalVisible}
                                        onClose={() => setIsBookmarksModalVisible(false)}
                                        onLoginClick={() => setIsLoginModalOpen(true)}
                                    />
                                </div>
                            </div>

                            {/* Theme Toggle */}
                            <ThemeToggle onClick={handleThemeToggle} />

                            {/* Profile/Login */}
                            {!user ? (
                                <button
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                                >
                                    <CiLogin className="text-lg" />
                                    <span className="hidden sm:block">Login</span>
                                </button>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={handleProfileToggle}
                                        className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-lg hover:bg-[var(--header-menu-bg)]/30 transition-all duration-300 group"
                                    >
                                        <div className="relative">
                                            {user.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-2 ring-[var(--header-border)]/50"
                                                    width={32}
                                                    height={32}
                                                />
                                            ) : (
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                                                    <FaRegUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                                </div>
                                            )}
                                            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-success rounded-full ring-1 ring-[var(--header-bg)]"></span>
                                        </div>
                                        <div className="hidden sm:flex flex-col items-start">
                                            <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                                                {user.displayName}
                                            </span>
                                            <span className="text-xs text-[var(--text-secondary)]">
                                                {user.role}
                                            </span>
                                        </div>
                                        <IoIosArrowDown className={`hidden sm:block w-4 h-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <ProfileMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            <ThemeModal
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
            />
        </>
    )
}
