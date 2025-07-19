import styled from "styled-components"
import * as Icon from "lucide-react"
import { colors } from "@/store/theme"

type Props = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  title: string | React.ReactNode
  actions?: React.ReactNode[]
  width?: number
}
export const Modal = (props: Props) => {
  return (
    <Styled.Wrap style={{ display: props.isOpen ? "flex" : "none" }}>
      <Styled.Content style={{ width: props.width || 600 }}>
        <Styled.CloseButton
          onClick={() => {
            props.onClose()
          }}
        >
          <Icon.X size={24} />
        </Styled.CloseButton>
        <Styled.Title>{props.title}</Styled.Title>
        {/* Render children if provided */}
        {props.children}
        {props.actions && (
          <Styled.Actions>
            {props.actions.map((action, index) => (
              <span key={index}>{action}</span>
            ))}
          </Styled.Actions>
        )}
      </Styled.Content>
    </Styled.Wrap>
  )
}

const Styled = {
  Title: styled.h2`
    margin: 0;
    font-size: 18px;
    color: ${colors.textPrimary};
    margin-bottom: 16px;
    border-bottom: 1px solid ${colors.borderSecondary};
    padding-bottom: 8px;
  `,
  Wrap: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: ${colors.bgOverlay};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Content: styled.div`
    position: relative;
    background-color: ${colors.bgPrimary};
    padding: 20px;
    border-radius: 8px;
    min-width: 600px;
  `,
  CloseButton: styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: ${colors.textPrimary};
    &:hover {
      color: ${colors.primary};
    }
  `,

  Actions: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    span {
      margin-left: 10px;
    }
  `,
}
