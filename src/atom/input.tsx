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

  label?: string
}

export const Input = (props: Props) => {
  const { value, placeholder, onChange, size = "medium", label } = props

  return (
    <Styled.Wrap size={size}>
      {label ? <Styled.Label>{props.label}</Styled.Label> : null}
      <Styled.Input
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={onChange}
        disabled={props.disable}
        size={size}
        is_left={props.leftIcon ? "true" : "false"}
        is_right={props.rightIcon ? "true" : "false"}
      />
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
  Label: styled.label`
    display: block;
    margin-bottom: ${spacing.xs};
    font-size: 14px;
    color: ${colors.textPrimary};
  `,
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
    is_left: string
    is_right: string
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
      props.is_left == "true"
        ? "40px"
        : getSizeStyles(props.size).padding.split(" ")[1]};
    padding-right: ${(props) =>
      props.is_right == "true"
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
