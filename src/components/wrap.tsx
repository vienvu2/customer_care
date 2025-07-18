import styled from "styled-components"

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  main?: React.ReactNode
  sidebar?: React.ReactNode
}

export const Layout = ({ children, header, footer, sidebar }: Props) => {
  return (
    <Styled.Wrap>
      <Styled.Header>{header || <h1>Header</h1>}</Styled.Header>
      <Styled.Main>
        {sidebar && <aside>{sidebar}</aside>}
        <div>{children}</div>
      </Styled.Main>
      <Styled.Footer>Footer</Styled.Footer>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: var(--font-geist-sans);
    color: #333;
  `,
  Header: styled.div``,
  Footer: styled.div``,
  Main: styled.main`
    padding: 20px;
    background-color: #f9f9f9;
    min-height: calc(100vh - 100px); // Adjust based on header/footer height
  `,
}
