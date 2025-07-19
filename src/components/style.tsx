import { colors } from "@/store/theme"
import styled from "styled-components"

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
`
export const Col = styled.div<{ span?: number }>`
  width: ${(props) => (props.span || 12) * (100 / 12)}%;
  padding: 0 12px;
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Styled = {
  Wrap: styled.div`
    padding: 12px;
    color: ${colors.textPrimary};
  `,
  Title: styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 0;
    flex: 1;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-top: 16px;
  `,

  HeaderActions: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  Box: styled.div`
    background-color: ${colors.bgSecondary};
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;

    h3 {
      margin-bottom: 12px;
      font-size: 18px;
      color: ${colors.textPrimary};
    }

    .value {
      font-size: 32px;
      font-weight: bold;
      color: ${colors.primary};
      margin-bottom: 8px;
    }

    .description {
      font-size: 14px;
      color: ${colors.textSecondary};
    }
  `,
}

export const FormStyled = {
  Title: styled.h2`
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: bold;
    color: ${colors.textPrimary};
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  Wrap: styled.div`
    padding: 12px;
    margin-top: 12px;
  `,
  Group: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  Label: styled.label`
    font-size: 14px;
    color: ${colors.textPrimary};
    display: block;
    margin-bottom: 4px;
  `,
  Input: styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${colors.borderPrimary};
    background-color: ${colors.bgPrimary};
    color: ${colors.textPrimary};
  `,

  Item: styled.div`
    margin-bottom: 12px;
  `,
}

export const DetailPage = {
  Wrap: styled.div`
    padding: 12px;
    color: ${colors.textPrimary};
  `,
  Title: styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  Content: styled.div`
    margin-top: 12px;
  `,
  Row: styled.div`
    display: flex;
    margin-bottom: 12px;
  `,
  Label: styled.label`
    font-weight: bold;
    color: ${colors.textSecondary};
    width: 150px;
  `,
  Value: styled.div`
    color: ${colors.textPrimary};
  `,

  Actions: styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;`
}
