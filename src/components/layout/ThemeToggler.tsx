"use client"

import { useTheme } from 'next-themes'

import { Button } from '../ui/button'
import { Icons } from '@/constants/icons'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Icons.sun 
          className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" 
          aria-hidden="true"
        />
      ) : (
        <Icons.moon
          className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" 
          aria-hidden="true"
        />
      )}
    </Button>
  )
}

export default ThemeToggler