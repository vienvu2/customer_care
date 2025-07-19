"use client"
import { colors } from "@/store/theme"
import Link from "next/link"
import { styled } from "styled-components"
import * as Icon from "lucide-react"
import { usePathname } from "next/navigation"
export const SideBar = () => {
  const pathname = usePathname()
  return (
    <Styled.Sidebar>
      <Styled.Menu>
        <Styled.MenuItem
          href="/dashboard"
          className={pathname === "/dashboard" ? "active" : ""}
        >
          <Icon.ChartBarBigIcon size={14} />
          Dashboard
        </Styled.MenuItem>
        <Styled.MenuItem
          href="/leads"
          className={pathname === "/leads" ? "active" : ""}
        >
          <Icon.User2 size={14} />
          Leads
        </Styled.MenuItem>
      </Styled.Menu>
    </Styled.Sidebar>
  )
}

const Styled = {
  Sidebar: styled.div``,
  Menu: styled.div`
    border-bottom: 1px solid ${colors.borderPrimary};
    padding: 10px;
  `,
  MenuItem: styled(Link)`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${colors.textPrimary};
    cursor: pointer;
    color: ${colors.textPrimary};
    text-decoration: none;
    &.active,
    &:hover {
      background-color: ${colors.bgSecondary};
      background-color: ${colors.bgSecondary};
      border-radius: 5px;
    }
    &.active {
      color: ${colors.primary};
    }
  `,
}
