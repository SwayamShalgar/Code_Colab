/**
 * Theme Context - Manages application theme (light/dark mode)
 * 
 * Features:
 * - Persistent theme preference (localStorage)
 * - System preference detection
 * - Smooth transitions between themes
 * - CSS class-based theme switching
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    resolvedTheme: ResolvedTheme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'code-sync-theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>('system')
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')

    // Get system theme preference
    const getSystemTheme = (): ResolvedTheme => {
        if (typeof window === 'undefined') return 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    // Resolve the actual theme to apply
    const resolveTheme = (t: Theme): ResolvedTheme => {
        if (t === 'system') {
            return getSystemTheme()
        }
        return t
    }

    // Apply theme to document
    const applyTheme = (resolvedTheme: ResolvedTheme) => {
        const root = document.documentElement
        
        // Remove both classes first
        root.classList.remove('light', 'dark')
        
        // Add the current theme class
        root.classList.add(resolvedTheme)
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                'content',
                resolvedTheme === 'dark' ? '#141414' : '#ffffff'
            )
        }
    }

    // Set theme and persist to localStorage
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
        localStorage.setItem(THEME_STORAGE_KEY, newTheme)
        const resolved = resolveTheme(newTheme)
        setResolvedTheme(resolved)
        applyTheme(resolved)
    }

    // Toggle between light and dark
    const toggleTheme = () => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
    }

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
        const initialTheme = storedTheme || 'system'
        const resolved = resolveTheme(initialTheme)
        
        setThemeState(initialTheme)
        setResolvedTheme(resolved)
        applyTheme(resolved)
    }, [])

    // Listen for system theme changes
    useEffect(() => {
        if (theme !== 'system') return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleChange = (e: MediaQueryListEvent) => {
            const newResolvedTheme = e.matches ? 'dark' : 'light'
            setResolvedTheme(newResolvedTheme)
            applyTheme(newResolvedTheme)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
