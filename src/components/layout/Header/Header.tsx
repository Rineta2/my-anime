"use client"

import Link from "next/link"

import { usePathname } from 'next/navigation'

import React, { useState } from 'react'

import { NavLinks, profile } from "@/components/layout/Header/data/header"

import { useTheme } from "@/utils/context/ThemeContext"

import ThemeModal from "@/components/layout/Header/ThemeModal"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

    const pathname = usePathname();

    const { theme } = useTheme();

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <header className='fixed top-0 left-0 w-full bg-[var(--header-bg)] backdrop-blur-md shadow-[0_4px_20px_var(--header-shadow)] z-50 border-b border-[var(--header-border)] transition-all duration-300'>
                <div className="container px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="profile">
                            <Link href={profile.href} className="text-2xl font-bold">
                                {profile.name}
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center gap-2">
                            <button
                                onClick={() => setIsThemeModalOpen(true)}
                                className="p-2.5 rounded-full hover:bg-[var(--hover-bg)] transition-all duration-300"
                            >
                                {theme === 'light' ? (
                                    <svg
                                        className="w-6 h-6 text-text"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : theme === 'dark' ? (
                                    <svg
                                        className="w-6 h-6 text-text"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-6 h-6 text-text"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
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

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-8">
                            {NavLinks.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className={`relative text-text hover:text-primary transition-all duration-300 font-medium group ${isActive(item.href) ? 'text-primary' : ''
                                            }`}
                                    >
                                        {item.name}
                                        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-hover transform transition-transform duration-300 ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden md:flex items-center gap-6">
                            <div className="login">
                                <Link
                                    href={"/signin"}
                                    className="px-6 py-3 rounded-full bg-primary text-white transition-all duration-300 font-medium"
                                >
                                    Login
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsThemeModalOpen(true)}
                                className="p-2.5 rounded-full hover:bg-[var(--hover-bg)] transition-all duration-300"
                            >
                                {theme === 'light' ? (
                                    <svg
                                        className="w-6 h-6 text-text"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : theme === 'dark' ? (
                                    <svg
                                        className="w-6 h-6 text-text"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-6 h-6 text-text"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 bg-[var(--header-menu-bg)] backdrop-blur-md rounded-2xl shadow-xl p-6 border border-[var(--header-border)] transition-all duration-300">
                            <ul className="flex flex-col gap-4">
                                {NavLinks.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            className={`block text-text hover:text-primary transition-all duration-300 py-2.5 font-medium hover:bg-[var(--hover-bg)] rounded-lg px-4 ${isActive(item.href) ? 'text-primary bg-[var(--hover-bg)]' : ''
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                                <li className="border-t border-[var(--header-border)] my-2"></li>
                                <li>
                                    <Link
                                        href="/signin"
                                        className="block w-full text-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-hover text-white hover:from-primary-hover hover:to-primary transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            <ThemeModal
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
            />
        </>
    )
}
