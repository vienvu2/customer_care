import styled from "styled-components"
import { colors, spacing, radius } from "@/store/theme"

type Props = {
  onClick?: () => void
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  type?: "primary" | "secondary" | "danger" | "success" | "warning"
  outline?: boolean
  size?: "small" | "medium" | "large"
  disabled?: boolean
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disable?: boolean
}

export const Input = (props: Props) => {
  const { value, placeholder, onChange, size = "medium" } = props

  return (
    <Styled.Wrap size={size}>
      {props.leftIcon && (
        <span className="icon left-icon">{props.leftIcon}</span>
      )}
      <Styled.Input
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={onChange}
        disabled={props.disable}
        size={size}
        hasLeftIcon={!!props.leftIcon}
        hasRightIcon={!!props.rightIcon}
      />
      {props.rightIcon && (
        <span className="icon right-icon">{props.rightIcon}</span>
      )}
    </Styled.Wrap>
  )
}

const getSizeStyles = (size: Props["size"]) => {
  switch (size) {
    case "small":
      return {
        padding: `${spacing.sm} ${spacing.md}`,
        fontSize: "14px",
        height: "36px",
      }
    case "large":
      return {
        padding: `${spacing.md} ${spacing.lg}`,
        fontSize: "16px",
        height: "48px",
      }
    default:
      return {
        padding: `${spacing.md}`,
        fontSize: "15px",
        height: "42px",
      }
  }
}

const Styled = {
  Wrap: styled.div<{ size: Props["size"] }>`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    .icon {
      position: absolute;
      z-index: 1;
      color: ${colors.textSecondary};
      transition: color 0.2s ease;

      &.left-icon {
        left: ${spacing.md};
      }

      &.right-icon {
        right: ${spacing.md};
      }
    }
  `,

  Input: styled.input<{
    size: Props["size"]
    hasLeftIcon: boolean
    hasRightIcon: boolean
  }>`
    width: 100%;
    border: 1px solid ${colors.borderPrimary};
    border-radius: ${radius.md};
    background-color: ${colors.bgPrimary};
    color: ${colors.textPrimary};
    font-size: ${(props) => getSizeStyles(props.size).fontSize};
    height: ${(props) => getSizeStyles(props.size).height};
    padding: ${(props) => getSizeStyles(props.size).padding};
    padding-left: ${(props) =>
      props.hasLeftIcon
        ? "40px"
        : getSizeStyles(props.size).padding.split(" ")[1]};
    padding-right: ${(props) =>
      props.hasRightIcon
        ? "40px"
        : getSizeStyles(props.size).padding.split(" ")[1]};

    transition: all 0.2s ease;

    &::placeholder {
      color: ${colors.textTertiary};
    }

    &:focus {
      outline: none;
      border-color: ${colors.borderFocus};
      box-shadow: 0 0 0 3px ${colors.primaryLight};
    }

    &:hover:not(:disabled) {
      border-color: ${colors.borderSecondary};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${colors.bgSecondary};
    }
  `,
}
