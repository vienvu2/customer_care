"use client"

import styled from "styled-components"
import { useUIStore } from "@/store/ui"
import { colors, spacing, radius } from "@/store/theme"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUIStore()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <Styled.Button onClick={() => toggleTheme()} aria-label="Toggle theme">
      {theme === "light" ? <Sun size={12} /> : <Moon size={12} />}
    </Styled.Button>
  )
}

const Styled = {
  Button: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid ${colors.borderPrimary};
    border-radius: ${radius.md};
    background-color: ${colors.bgPrimary};
    color: ${colors.textSecondary};
    cursor: pointer;
    transition: all 0.2s ease;

  &:hover {
      background-color: ${colors.bgSecondary};
      color: ${colors.textPrimary};
      border-color: ${colors.borderSecondary};
    }

    &:focus {
      outline: none;
      border-color: ${colors.borderFocus};
      box-shadow: 0 0 0 3px ${colors.primaryLight};
    }
  `,
}
