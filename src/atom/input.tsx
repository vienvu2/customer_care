import styled from "styled-components"
export const Input = () => {
  return (
    <Styled.Wrap>
      <Styled.Input placeholder="Type here..." />
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
  Input: styled.input`
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;

    &:focus {
      border-color: #0070f3;
      outline: none;
    }
  `,
}
