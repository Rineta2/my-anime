"use client"

import React, { useState } from 'react'

import { CiLogin } from 'react-icons/ci'

import { FaRegUser } from "react-icons/fa"

import { IoIosArrowDown } from 'react-icons/io'

import Image from "next/image"

import { useAuth } from "@/utils/context/AuthContext"

import ThemeModal from "@/components/layout/Header/ThemeModal"

import LoginModal from "@/components/layout/Header/auth/signin/LoginModal"

import Logo from "./components/Logo"

import ThemeToggle from "./components/ThemeToggle"

import DesktopNav from "./components/DesktopNav"

import MobileNav from "./components/MobileNav"

import ProfileMenu from "./components/ProfileMenu"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

    const { user } = useAuth();

    const handleMobileProfileToggle = () => {
        setIsMobileProfileOpen(!isMobileProfileOpen);
        setIsMenuOpen(false);
        setIsThemeModalOpen(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsMobileProfileOpen(false);
        setIsThemeModalOpen(false);
    };

    const handleThemeToggle = () => {
        setIsThemeModalOpen(true);
        setIsProfileOpen(false);
        setIsMobileProfileOpen(false);
        setIsMenuOpen(false);
    };

    const handleProfileToggle = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsThemeModalOpen(false);
    };

    return (
        <>
            <header className='fixed top-0 left-0 w-full bg-[var(--header-bg)] backdrop-blur-md shadow-[0_4px_20px_var(--header-shadow)] z-50 border-b border-[var(--header-border)] transition-all duration-300'>
                <div className="container px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Logo />

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center gap-2">
                            {!user ? (
                                <button
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all text-sm font-semibold shadow-lg hover:-translate-y-0.5 duration-300"
                                >
                                    <CiLogin className="text-base" />
                                    <span className="hidden sm:block text-sm">Login</span>
                                </button>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={handleMobileProfileToggle}
                                        className="relative"
                                        aria-label="Toggle profile menu"
                                        aria-expanded={isMobileProfileOpen}
                                    >
                                        {user.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]"
                                                width={32}
                                                height={32}
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]">
                                                <FaRegUser className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-[var(--background)]"></span>
                                    </button>
                                    <ProfileMenu isOpen={isMobileProfileOpen} onClose={() => setIsMobileProfileOpen(false)} isMobile />
                                </div>
                            )}
                            <ThemeToggle onClick={handleThemeToggle} />
                            <button
                                onClick={handleMenuToggle}
                                className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition-all duration-300"
                            >
                                <svg
                                    className="w-6 h-6 text-text"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        <DesktopNav />

                        <div className="hidden md:flex items-center gap-6">
                            {!user ? (
                                <button
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[var(--header-menu-bg)] backdrop-blur-md rounded-2xl shadow-xl p-6 border border-[var(--header-border)] transition-all duration-300"
                                >
                                    <CiLogin className="text-base" />
                                    Login
                                </button>
                            ) : (
                                <div className="relative hidden md:block">
                                    <button
                                        onClick={handleProfileToggle}
                                        className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[var(--hover-bg)] group"
                                    >
                                        <div className="relative">
                                            {user.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]"
                                                    width={40}
                                                    height={40}
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]">
                                                    <FaRegUser className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-[var(--background)]"></span>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs font-semibold text-[var(--text)] group-hover:text-primary transition-colors duration-200">
                                                {user.displayName}
                                            </span>
                                            <span className="text-[10px] text-[var(--text-secondary)]">
                                                {user.role}
                                            </span>
                                        </div>
                                        <IoIosArrowDown className={`transition-transform duration-200 text-[var(--text-secondary)] ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <ProfileMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                                </div>
                            )}
                            <ThemeToggle onClick={handleThemeToggle} />
                        </div>
                    </div>

                    <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </div>
            </header>

            <ThemeModal
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
            />
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    )
}
