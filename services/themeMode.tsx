'use client'

import { Theme } from "@radix-ui/themes";
import React, { createContext, useEffect, useState } from "react";

type Mode = 'dark' | 'light'

interface ThemeModeContextProperties {
  mode: Mode
  toggleMode: () => void
}
export const ThemeModeContext = createContext<ThemeModeContextProperties>({
  mode: 'dark',
  toggleMode: () => undefined,  // Placeholder function, should be implemented based on your application logic.
})

interface ThemeModeProviderProperties {
  children: React.ReactNode
}
const ThemeModeProvider: React.FC<ThemeModeProviderProperties> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(localStorage.getItem('themeMode') as Mode || 'dark')

  useEffect(() => {
    const mode = localStorage.getItem('themeMode')
    if (mode !== null) {
      setMode(mode as Mode)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <Theme appearance={mode}>
        {children}
      </Theme>
    </ThemeModeContext.Provider>
  )
}

export default ThemeModeProvider
