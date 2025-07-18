"use client"
import Link from "next/link"
import { styled } from "styled-components"
export const SideBar = () => {
  return (
    <Styled.Sidebar>
      <Styled.Menu>
        <Styled.MenuItem href="/dashboard" className="active">
          Dashboard
        </Styled.MenuItem>
        <Styled.MenuItem href="/leads" className="active">
          Leads
        </Styled.MenuItem>
        <Styled.MenuItem href="/customers" className="active">
          Users
        </Styled.MenuItem>
        <Styled.MenuItem href="/settings" className="active">
          Settings
        </Styled.MenuItem>
        <Styled.MenuItem href="/reports" className="active">
          Reports
        </Styled.MenuItem>
        <Styled.MenuItem href="/help" className="active">
          Help
        </Styled.MenuItem>
      </Styled.Menu>
    </Styled.Sidebar>
  )
}

const Styled = {
  Sidebar: styled.div``,

  Menu: styled.div``,

  MenuItem: styled(Link)`
    padding: 10px;
    display: block;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
    }
  `,
}
