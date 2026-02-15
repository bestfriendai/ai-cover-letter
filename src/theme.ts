// Theme for AI Cover Letter - Professional Indigo Brand
export const theme = {
  colors: {
    primary: '#4338CA',      // Indigo-700 - main brand
    primaryLight: '#6366F1', // Indigo-500
    primaryDark: '#3730A3',  // Indigo-800
    accent: '#F59E0B',       // Amber-500 - CTAs, highlights
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceSecondary: '#F3F4F6',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 9999,
  },
  fontSize: {
    caption: 13,
    body: 17,
    subhead: 15,
    title: 22,
    largeTitle: 34,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export type Theme = typeof theme;
