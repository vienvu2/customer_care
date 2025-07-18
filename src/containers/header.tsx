"use client"
import { Button } from "@/atom/button"
import { Input } from "@/atom/input"
import { PanelRightClose, PanelRightOpen } from "lucide-react"
import { useState } from "react"
import { styled } from "styled-components"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Styled.Wrap>
      <Styled.Left>
        <Styled.MenuToggle>
          {menuOpen ? (
            <PanelRightClose color="white" onClick={() => setMenuOpen(false)} />
          ) : (
            <PanelRightOpen color="white" onClick={() => setMenuOpen(true)} />
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
          Create
        </Button>
      </Styled.Center>
      <div className="header-right">
        <span className="icon-setting" />
        <span className="icon-user" />
        <button className="logout-btn">Logout</button>
      </div>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #242424ff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  MenuToggle: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    margin-right: 20px;

    &:hover {
      color: #0070f3;
    }
  `,

  Center: styled.div`
    max-width: 600px;
    width: 100%;
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
    display: flex;
    align-items: center;
  `,

  Left: styled.div`
    display: flex;
    align-items: center;
  `,
}
