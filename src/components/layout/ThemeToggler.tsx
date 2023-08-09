"use client"

import { Icons } from "@/constants/icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

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
          className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          aria-hidden="true"
        />
      ) : (
        <Icons.moon
          className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100"
          aria-hidden="true"
        />
      )}
    </Button>
  )
}

export default ThemeToggler
