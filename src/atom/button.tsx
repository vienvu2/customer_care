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
  leftIcon,
  rightIcon,
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
    padding: 12px 24px;
    color: #fff;
    background-color: #0070f3;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    &.b-primary {
      background-color: #0070f3;
      color: white;
    }
    &.b-secondary {
      background-color: #6c757d;
      color: white;
    }
    &.b-danger {
      background-color: #dc3545;
      color: white;
    }
    &.b-success {
      background-color: #28a745;
      color: white;
    }
    &.b-warning {
      background-color: #ffc107;
      color: black;
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
