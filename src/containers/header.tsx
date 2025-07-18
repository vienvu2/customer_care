import { useState } from "react"
import { styled } from "styled-components"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header-container">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="icon-menu" />
        </button>
        <span className="app-icon" />
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          aria-label="Search"
        />
        <button className="create-btn">Create</button>
      </div>
      <div className="header-right">
        <span className="icon-setting" />
        <span className="icon-user" />
        <button className="logout-btn">Logout</button>
      </div>
      {menuOpen && <nav className="side-menu">{/* Menu content here */}</nav>}
    </header>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f4f4f4;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,

  HeaderLeft: styled.div`
    display: flex;
    align-items: center;

    .menu-toggle {
      background: none;
      border: none;
      cursor: pointer;
      margin-right: 20px;
    }

    .app-icon {
      width: 30px;
      height: 30px;
      background-color: #0070f3;
      border-radius: 50%;
      margin-right: 10px;
    }

    .logo {
      height: 40px;
    }
  `,
}
