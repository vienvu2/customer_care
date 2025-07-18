import styled from "styled-components"

export const Button = () => {
  return (
    <Styled.Wrap>
      <Styled.Button>Click Me</Styled.Button>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
