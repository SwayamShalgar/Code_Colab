/**
 * Design Tokens for Code-Sync
 * Modern, consistent design system with light and dark mode support
 * 
 * This file centralizes all design decisions including:
 * - Color palette with semantic naming
 * - Typography scale and font families
 * - Spacing system based on 4px base unit
 * - Border radius tokens
 * - Shadow definitions
 * - Animation/transition settings
 */

export const designTokens = {
  // Color System - Modern, accessible color palette
  colors: {
    // Primary brand colors - vibrant teal-blue gradient
    primary: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff', // Main primary
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
    },
    
    // Secondary accent colors - warm coral/orange
    secondary: {
      50: '#fff7e6',
      100: '#ffe7ba',
      200: '#ffd591',
      300: '#ffc069',
      400: '#ffa940',
      500: '#fa8c16', // Main secondary
      600: '#d46b08',
      700: '#ad4e00',
      800: '#873800',
      900: '#612500',
    },
    
    // Success colors - vibrant green
    success: {
      50: '#f6ffed',
      100: '#d9f7be',
      200: '#b7eb8f',
      300: '#95de64',
      400: '#73d13d',
      500: '#52c41a', // Main success
      600: '#389e0d',
      700: '#237804',
      800: '#135200',
      900: '#092b00',
    },
    
    // Warning colors - amber
    warning: {
      50: '#fffbe6',
      100: '#fff1b8',
      200: '#ffe58f',
      300: '#ffd666',
      400: '#ffc53d',
      500: '#faad14', // Main warning
      600: '#d48806',
      700: '#ad6800',
      800: '#874d00',
      900: '#613400',
    },
    
    // Error/Danger colors - red
    error: {
      50: '#fff1f0',
      100: '#ffccc7',
      200: '#ffa39e',
      300: '#ff7875',
      400: '#ff4d4f',
      500: '#f5222d', // Main error
      600: '#cf1322',
      700: '#a8071a',
      800: '#820014',
      900: '#5c0011',
    },
    
    // Info colors - blue
    info: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff', // Main info
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
    },
    
    // Neutral colors for backgrounds, text, borders
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
  },
  
  // Semantic color mapping for light mode
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
      elevated: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.45)',
    },
    text: {
      primary: '#262626',
      secondary: '#595959',
      tertiary: '#8c8c8c',
      disabled: '#bfbfbf',
      inverse: '#ffffff',
    },
    border: {
      default: '#d9d9d9',
      light: '#e8e8e8',
      strong: '#bfbfbf',
      focus: '#40a9ff',
    },
    interactive: {
      default: '#1890ff',
      hover: '#40a9ff',
      active: '#096dd9',
      disabled: '#d9d9d9',
    },
  },
  
  // Semantic color mapping for dark mode
  dark: {
    background: {
      primary: '#141414',
      secondary: '#1f1f1f',
      tertiary: '#262626',
      elevated: '#1f1f1f',
      overlay: 'rgba(0, 0, 0, 0.65)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d9d9d9',
      tertiary: '#8c8c8c',
      disabled: '#595959',
      inverse: '#141414',
    },
    border: {
      default: '#434343',
      light: '#303030',
      strong: '#595959',
      focus: '#1890ff',
    },
    interactive: {
      default: '#1890ff',
      hover: '#40a9ff',
      active: '#096dd9',
      disabled: '#434343',
    },
  },
  
  // Typography system
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      secondary: '"Space Grotesk", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
    },
  },
  
  // Spacing system based on 4px base unit
  spacing: {
    0: '0',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem',     // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },
  
  // Border radius system
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadow system
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    glow: '0 0 20px rgba(24, 144, 255, 0.3)',
  },
  
  // Animation & Transition
  animation: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Z-index system
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const

export type DesignTokens = typeof designTokens
