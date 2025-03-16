import tailwindColors from 'tailwindcss/colors'
import type { DefaultColors } from 'tailwindcss/types/generated/colors'

export type ColorType = keyof DefaultColors

export type colorType = 'emerald' | 'blue' | 'purple' | 'orange' | 'red' | 'zinc'

export const formatThemeColors = (color: colorType) => {
  const colors = {
    emerald: {
      '400': '#34d399',
      '500': '#10b981'
    },
    blue: {
      '400': '#60a5fa',
      '500': '#3b82f6'
    },
    purple: {
      '400': '#c084fc',
      '500': '#a855f7'
    },
    orange: {
      '400': '#fb923c',
      '500': '#f97316'
    },
    red: {
      '400': '#f87171',
      '500': '#ef4444'
    },
    zinc: {
      '400': '#a1a1aa',
      '500': '#71717a'
    }
  }

  return colors[color]
}