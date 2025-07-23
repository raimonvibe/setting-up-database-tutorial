'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  try {
    const { theme, toggleTheme } = useTheme()

    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    )
  } catch (error) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <Moon className="h-5 w-5 text-gray-600" />
      </button>
    )
  }
}
