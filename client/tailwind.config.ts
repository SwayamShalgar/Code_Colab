/**
 * Tailwind Configuration for Code-Sync
 * Modern design system with comprehensive theming support
 * Integrated with design tokens for consistency
 */

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{jsx,tsx}", "./*.html"],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            // Modern color palette
            colors: {
                // Primary brand colors - vibrant blue
                primary: {
                    50: '#e6f7ff',
                    100: '#bae7ff',
                    200: '#91d5ff',
                    300: '#69c0ff',
                    400: '#40a9ff',
                    500: '#1890ff',
                    600: '#096dd9',
                    700: '#0050b3',
                    800: '#003a8c',
                    900: '#002766',
                    DEFAULT: '#1890ff',
                },
                // Secondary accent - warm coral
                secondary: {
                    50: '#fff7e6',
                    100: '#ffe7ba',
                    200: '#ffd591',
                    300: '#ffc069',
                    400: '#ffa940',
                    500: '#fa8c16',
                    600: '#d46b08',
                    700: '#ad4e00',
                    800: '#873800',
                    900: '#612500',
                    DEFAULT: '#fa8c16',
                },
                // Success colors
                success: {
                    50: '#f6ffed',
                    100: '#d9f7be',
                    200: '#b7eb8f',
                    300: '#95de64',
                    400: '#73d13d',
                    500: '#52c41a',
                    600: '#389e0d',
                    700: '#237804',
                    800: '#135200',
                    900: '#092b00',
                    DEFAULT: '#52c41a',
                },
                // Warning colors
                warning: {
                    50: '#fffbe6',
                    100: '#fff1b8',
                    200: '#ffe58f',
                    300: '#ffd666',
                    400: '#ffc53d',
                    500: '#faad14',
                    600: '#d48806',
                    700: '#ad6800',
                    800: '#874d00',
                    900: '#613400',
                    DEFAULT: '#faad14',
                },
                // Error/Danger colors
                danger: {
                    50: '#fff1f0',
                    100: '#ffccc7',
                    200: '#ffa39e',
                    300: '#ff7875',
                    400: '#ff4d4f',
                    500: '#f5222d',
                    600: '#cf1322',
                    700: '#a8071a',
                    800: '#820014',
                    900: '#5c0011',
                    DEFAULT: '#f5222d',
                },
                error: {
                    50: '#fff1f0',
                    100: '#ffccc7',
                    200: '#ffa39e',
                    300: '#ff7875',
                    400: '#ff4d4f',
                    500: '#f5222d',
                    600: '#cf1322',
                    700: '#a8071a',
                    800: '#820014',
                    900: '#5c0011',
                    DEFAULT: '#f5222d',
                },
                // Neutral grays
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e8e8e8',
                    300: '#d9d9d9',
                    400: '#bfbfbf',
                    500: '#8c8c8c',
                    600: '#595959',
                    700: '#434343',
                    800: '#262626',
                    900: '#1f1f1f',
                    950: '#141414',
                },
                // Legacy color mapping for backwards compatibility
                dark: "#141414",
                darkHover: "#262626",
                light: "#f5f5f5",
            },
            
            // Modern font families
            fontFamily: {
                sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                display: ['"Space Grotesk"', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
            },
            
            // Spacing system
            spacing: {
                '0.5': '0.125rem',
                '1.5': '0.375rem',
                '2.5': '0.625rem',
                '3.5': '0.875rem',
                '4.5': '1.125rem',
            },
            
            // Border radius
            borderRadius: {
                'base': '0.375rem',
            },
            
            // Box shadows
            boxShadow: {
                'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                'base': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'glow': '0 0 20px rgba(24, 144, 255, 0.3)',
                'glow-success': '0 0 20px rgba(82, 196, 26, 0.3)',
            },
            
            // Animations
            animation: {
                'up-down': 'up-down 2s ease-in-out infinite alternate',
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-up': 'slide-up 0.3s ease-out',
                'slide-down': 'slide-down 0.3s ease-out',
                'slide-left': 'slide-left 0.3s ease-out',
                'slide-right': 'slide-right 0.3s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
                'spin-slow': 'spin 3s linear infinite',
            },
            
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-left': {
                    '0%': { transform: 'translateX(10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'slide-right': {
                    '0%': { transform: 'translateX(-10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'up-down': {
                    '0%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(0px)' },
                },
            },
            
            // Transitions
            transitionDuration: {
                '350': '350ms',
            },
            
            // Z-index
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
        },
    },
    plugins: [],
}
