"use client"
import { colors } from "@/store/theme"
import Link from "next/link"
import { styled } from "styled-components"
import * as Icon from "lucide-react"
import { usePathname } from "next/navigation"

type IMenu = {
  key: string
  label: string
  icon: React.ReactNode
  href: string
}
export const SideBar = () => {
  const menus: IMenu[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Icon.ChartBarBigIcon size={14} />,
      href: "/dashboard",
    },
    {
      key: "leads",
      label: "Khách hàng tiềm năng",
      icon: <Icon.User2 size={14} />,
      href: "/leads",
    },

    {
      key: "users",
      label: "Người dùng",
      icon: <Icon.Settings size={14} />,
      href: "/users",
    },
    {
      key: "interactions",
      label: "Tương tác",
      icon: <Icon.MessageCircle size={14} />,
      href: "/interactions",
    },
    {
      key: "appointments",
      label: "Lịch hẹn",
      icon: <Icon.Calendar size={14} />,
      href: "/appointments",
    },
  ]
  const pathname = usePathname()
  return (
    <Styled.Sidebar>
      <Styled.Menu>
        {menus.map((menu) => (
          <Styled.MenuItem
            key={menu.key}
            href={menu.href}
            className={pathname === menu.href ? "active" : ""}
          >
            {menu.icon}
            {menu.label}
          </Styled.MenuItem>
        ))}
        {/* <Styled.MenuItem
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
        </Styled.MenuItem> */}
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
