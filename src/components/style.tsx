import { colors } from "@/store/theme"
import styled from "styled-components"

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Col = styled.div<{ span?: number }>`
  width: ${(props) => (props.span || 12) * (100 / 12)}%;
  padding: 0 10px;
`

export const Styled = {
  Wrap: styled.div`
    padding: 12px;
    color: ${colors.textPrimary};
  `,
  Title: styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  `,

  Box: styled.div`
    background-color: ${colors.bgSecondary};
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

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
