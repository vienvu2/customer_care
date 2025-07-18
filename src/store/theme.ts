export const colors = {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryLight: 'var(--color-primary-light)',

    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',

    success: 'var(--color-success)',
    successLight: 'var(--color-success-light)',
    warning: 'var(--color-warning)',
    warningLight: 'var(--color-warning-light)',
    error: 'var(--color-error)',
    errorLight: 'var(--color-error-light)',
    info: 'var(--color-info)',
    infoLight: 'var(--color-info-light)',

    bgPrimary: 'var(--bg-primary)',
    bgSecondary: 'var(--bg-secondary)',
    bgTertiary: 'var(--bg-tertiary)',
    bgOverlay: 'var(--bg-overlay)',

    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textTertiary: 'var(--text-tertiary)',
    textInverse: 'var(--text-inverse)',

    borderPrimary: 'var(--border-primary)',
    borderSecondary: 'var(--border-secondary)',
    borderFocus: 'var(--border-focus)',
} as const

export const spacing = {
    xs: 'var(--space-xs)',
    sm: 'var(--space-sm)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
    xl: 'var(--space-xl)',
} as const

export const radius = {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
} as const

export const shadows = {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
} as const

// Helper function để get CSS variable value
export const getCSSVariable = (variable: string): string => {
    if (typeof window === 'undefined') return ''
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

// Helper function để set CSS variable
export const setCSSVariable = (variable: string, value: string): void => {
    if (typeof window === 'undefined') return
    document.documentElement.style.setProperty(variable, value)
}