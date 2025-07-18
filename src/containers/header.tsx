"use client"
import { Button } from "@/atom/button"
import { Input } from "@/atom/input"
import { ThemeToggle } from "@/atom/theme-toggle"
import { colors } from "@/store/theme"
import { Bell, PanelRightClose, PanelRightOpen } from "lucide-react"
import { useState } from "react"
import { styled } from "styled-components"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Styled.Wrap>
      <Styled.Left>
        <Styled.MenuToggle>
          {menuOpen ? (
            <PanelRightClose
              color={colors.textPrimary}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <PanelRightOpen
              color={colors.textPrimary}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </Styled.MenuToggle>
      </Styled.Left>
      <Styled.Center>
        <Styled.Search>
          <Input />
        </Styled.Search>
        <Button
          onClick={() => console.log("Create new item")}
          leftIcon={<span className="icon-plus" />}
        >
          Tạo mới
        </Button>
      </Styled.Center>
      <Styled.Right>
        <ThemeToggle />
        <Bell color="white" size={14} />
      </Styled.Right>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    padding: 10px 20px;
    background-color: ${colors.bgPrimary};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  MenuToggle: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
      color: ${colors.primary};
    }
  `,

  Center: styled.div`
    max-width: 600px;
    width: 100%;
    align-items: center;
    display: flex;
    align-items: center;

    input {
      flex-grow: 1;
      margin-right: 10px;
    }

    button {
      margin-left: 10px;
    }
  `,

  Search: styled.div`
    flex-grow: 1;
    align-items: center;
    display: flex;
    align-items: center;
  `,

  Left: styled.div`
    align-items: center;
    display: flex;
    align-items: center;
  `,
  Right: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
}
