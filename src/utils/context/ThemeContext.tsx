"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme) {
            setTheme(savedTheme)
            if (savedTheme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                document.documentElement.classList.toggle('dark', systemTheme === 'dark')
            } else {
                document.documentElement.classList.toggle('dark', savedTheme === 'dark')
            }
        } else {
            // Default to system theme
            setTheme('system')
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            document.documentElement.classList.toggle('dark', systemTheme === 'dark')
        }
    }, [mounted])

    // Listen for system theme changes
    useEffect(() => {
        if (!mounted) return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                document.documentElement.classList.toggle('dark', e.matches)
            }
        }

        // Initial check
        if (theme === 'system') {
            document.documentElement.classList.toggle('dark', mediaQuery.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [mounted, theme])

    const toggleTheme = () => {
        let newTheme: Theme;
        switch (theme) {
            case 'light':
                newTheme = 'dark';
                break;
            case 'dark':
                newTheme = 'system';
                break;
            case 'system':
                newTheme = 'light';
                break;
            default:
                newTheme = 'light';
        }

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', systemTheme === 'dark');
        } else {
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    }

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', systemTheme === 'dark');
        } else {
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return null
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
} 