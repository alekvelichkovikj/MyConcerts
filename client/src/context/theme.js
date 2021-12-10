import { createContext, useState } from 'react'

const themes = {
  dark: {
    backgroundColor: '#1f1f1f',
    color: '#f3f3f3',
  },
  light: {
    backgroundColor: '#f3f3f3',
    color: '#1f1f1f',
  },
}

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  const theme = isDark ? themes.dark : themes.light

  const toggleTheme = () => {
    setIsDark(!isDark)
  }
  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}
