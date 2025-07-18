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

  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disable?: boolean
}
export const Input = (props: Props) => {
  const { value, placeholder, onChange } = props
  return (
    <Styled.Wrap>
      {props.leftIcon && <span className="icon">{props.leftIcon}</span>}
      <Styled.Input
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={onChange}
        disabled={props.disable}
      />
      {props.rightIcon && <span className="icon">{props.rightIcon}</span>}
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    .icon {
      margin-right: 10px;
      color: #666;
    }
  `,
  Input: styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;

    background-color: transparent;

    color: white;

    &:focus {
      border-color: #0070f3;
      outline: none;
    }
  `,
}
