import styled from "styled-components"
import { colors, spacing, radius } from "@/store/theme"

type Props = {
  onClick?: () => void
  children?: React.ReactNode
  value?: string
  placeholder?: string
  onChange?: (e: never) => void
  disabled?: boolean
  label?: string

  size?: "small" | "medium" | "large"
}

export const Select = (props: Props) => {
  const { size } = props

  return (
    <Styled.Select {...props} size={size}>
      {props.children}
    </Styled.Select>
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

  Select: styled.select<{
    size: Props["size"]
  }>`
    width: 100%;
    border: 1px solid ${colors.borderPrimary};
    border-radius: ${radius.md};
    background-color: ${colors.bgPrimary};
    color: ${colors.textPrimary};
    font-size: ${(props) => getSizeStyles(props.size).fontSize};
    height: ${(props) => getSizeStyles(props.size).height};
    padding: ${(props) => getSizeStyles(props.size).padding};
    padding-top: 0;
    padding-bottom: 0;

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
