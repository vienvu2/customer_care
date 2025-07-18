import styled from "styled-components"

type Props = { onClick?: () => void; children?: React.ReactNode }

export const Button = ({ onClick, children }: Props) => {
  return (
    <Styled.Wrap>
      <Styled.Button onClick={onClick} type="button">
        {children}
      </Styled.Button>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Button: styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #0070f3;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }
  `,
}
