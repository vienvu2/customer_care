"use client"
import { Header } from "@/containers/header"
import { SideBar } from "@/containers/sidebar"
import { styled } from "styled-components"
import { Footer } from "./footer"
import { RightSide } from "./rightSide"

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  main?: React.ReactNode
  sidebar?: React.ReactNode
  rightsidebar?: React.ReactNode
}

export const Layout = ({
  children,
  header,
  footer,
  sidebar,
  rightsidebar,
}: Props) => {
  return (
    <Styled.Wrap>
      <Styled.Header>{header || <Header />}</Styled.Header>
      <Styled.Main>
        <Styled.Sidebar>{sidebar || <SideBar />}</Styled.Sidebar>
        <Styled.Content>
          <div>{children}</div>
        </Styled.Content>
        <Styled.RightSidebar>
          {rightsidebar || <RightSide />}
        </Styled.RightSidebar>
      </Styled.Main>
      <Styled.Footer>{footer || <Footer />}</Styled.Footer>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    min-height: 100vh;
    color: #333;
  `,
  Header: styled.div``,
  Footer: styled.div``,
  Main: styled.main`
    background-color: #f9f9f9;
    min-height: calc(100vh - 100px); // Adjust based on header/footer height
    display: flex;
  `,

  Sidebar: styled.div`
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; // Prevent sidebar from shrinking
  `,
  RightSidebar: styled.div`
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; // Prevent right sidebar from shrinking
  `,

  Content: styled.div`
    flex: 1; // Allow content to take remaining space
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-left: 20px; // Space between sidebar and content
  `,
}
