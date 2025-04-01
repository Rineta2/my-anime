import React from 'react'
import { useTheme } from '@/utils/context/ThemeContext'

interface ThemeModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
    const { theme, setTheme } = useTheme()

    if (!isOpen) return null

    return (
        <div className="fixed top-[70px] right-4 md:right-8 lg:right-12 z-50">
            <div className="bg-[var(--header-bg)] rounded-2xl p-6 w-64 shadow-xl border border-[var(--header-border)] backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-text">Theme Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition-all duration-300"
                    >
                        <svg
                            className="w-5 h-5 text-text"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => {
                            setTheme('system');
                            onClose();
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${theme === 'system'
                            ? 'bg-primary text-white'
                            : 'hover:bg-[var(--hover-bg)] text-text'
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        System Theme
                    </button>

                    <button
                        onClick={() => {
                            setTheme('light');
                            onClose();
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${theme === 'light'
                            ? 'bg-primary text-white'
                            : 'hover:bg-[var(--hover-bg)] text-text'
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light Mode
                    </button>

                    <button
                        onClick={() => {
                            setTheme('dark');
                            onClose();
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${theme === 'dark'
                            ? 'bg-primary text-white'
                            : 'hover:bg-[var(--hover-bg)] text-text'
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark Mode
                    </button>
                </div>
            </div>
        </div>
    )
} 