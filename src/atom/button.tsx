import { colors } from "@/store/theme"
import styled from "styled-components"

type Props = {
  onClick?: () => void
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  type?: "primary" | "secondary" | "danger" | "success" | "warning"
  outline?: boolean
  size?: "small" | "medium" | "large"
  disabled?: boolean
}

export const Button = ({
  onClick,
  children,
  type = "primary",
  outline = false,
  size = "medium",
  disabled = false,
}: Props) => {
  return (
    <Styled.Button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`b-${type} b-${size} b-${outline ? "outline" : ""}`}
    >
      {children}
    </Styled.Button>
  )
}

const Styled = {
  Wrap: styled.div``,
  Button: styled.button`
    color: #fff;
    background-color: ${colors.primary};
    border: none;
    border-radius: 5px;
    font-family: inherit;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    &.b-primary {
      background-color: ${colors.primary};
      color: white;
    }
    &.b-secondary {
      background-color: ${colors.secondary};
      color: white;
    }
    &.b-danger {
      background-color: ${colors.danger};
      color: white;
    }
    &.b-success {
      background-color: ${colors.success};
      color: white;
    }
    &.b-warning {
      background-color: ${colors.warning};
      color: black;
    }

    &.b-small {
      height: 28px;
      padding: 0 12px;
      font-size: 12px;
    }
    &.b-medium {
      height: 32px;
      padding: 0 16px;
      font-size: 14px;
    }
    &.b-large {
      height: 40px;
      padding: 0 20px;
      font-size: 16px;
    }
  `,

  Outline: styled.button`
    padding: 12px 24px;
    color: #0070f3;
    background-color: transparent;
    border: 2px solid #0070f3;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 112, 243, 0.1);
    }
  `,
}
