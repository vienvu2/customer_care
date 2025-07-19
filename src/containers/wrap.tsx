"use client"
import { Header } from "@/containers/header"
import { SideBar } from "@/containers/sidebar"
import { styled } from "styled-components"
import { Footer } from "./footer"
import { RightSide } from "./rightSide"
import { useUIStore } from "@/store/ui"
import { colors } from "@/store/theme"

import { Styled as StyledPage } from "@/components/style"
import { Button } from "@/atom/button"

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  main?: React.ReactNode
  sidebar?: React.ReactNode
}

export const Layout = ({ children, header, footer, sidebar }: Props) => {
  const { sidebarOpen } = useUIStore()
  const { leftWidth, rightWidth } = useUIStore()
  return (
    <Styled.Wrap>
      <Styled.Header>{header || <Header />}</Styled.Header>
      <Styled.Main>
        {sidebarOpen && (
          <Styled.Sidebar style={{ width: leftWidth || "250px" }}>
            {sidebar || <SideBar />}
          </Styled.Sidebar>
        )}
        <Styled.ResizeLine
          style={{
            borderRight: `1px solid ${colors.borderPrimary}`,
          }}
          onMouseDown={(e) => {
            const startX = e.clientX
            const startWidth = leftWidth ?? 250

            const min = 200 // Minimum width for the left sidebar
            const max = 600 // Maximum width for the left sidebar

            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = startWidth + (moveEvent.clientX - startX)
              if (newWidth < min || newWidth > max) return

              useUIStore.getState().setLeftWidth(newWidth)
            }

            const onMouseUp = () => {
              document.removeEventListener("mousemove", onMouseMove)
              document.removeEventListener("mouseup", onMouseUp)
            }

            document.addEventListener("mousemove", onMouseMove)
            document.addEventListener("mouseup", onMouseUp)
          }}
        />
        <Styled.Center>{children}</Styled.Center>
      </Styled.Main>
    </Styled.Wrap>
  )
}

type ListPageProps = {
  children: React.ReactNode
  detail?: React.ReactNode
  title?: string
  actions?: React.ReactNode[]
}

export const ListPage = ({ children, detail, ...props }: ListPageProps) => {
  const { leftWidth, rightWidth } = useUIStore()
  return (
    <>
      <Styled.Content>
        <StyledPage.Wrap>
          <StyledPage.Header>
            <StyledPage.Title>{props.title}</StyledPage.Title>
            <StyledPage.HeaderActions>{props.actions}</StyledPage.HeaderActions>
          </StyledPage.Header>
          <div>{children}</div>
        </StyledPage.Wrap>
      </Styled.Content>
      {detail && (
        <>
          <Styled.ResizeLine
            style={{
              borderRight: `1px solid ${colors.borderPrimary}`,
            }}
            onMouseDown={(e) => {
              const startX = e.clientX
              const startWidth = rightWidth ?? 250

              const min = 200 // Minimum width for the left sidebar
              const max = 900 // Maximum width for the left sidebar

              const onMouseMove = (moveEvent: MouseEvent) => {
                const newWidth = startWidth - (moveEvent.clientX - startX)
                if (newWidth < min || newWidth > max) return

                useUIStore.getState().setRightWidth(newWidth)
              }

              const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove)
                document.removeEventListener("mouseup", onMouseUp)
              }

              document.addEventListener("mousemove", onMouseMove)
              document.addEventListener("mouseup", onMouseUp)
            }}
          />
          <Styled.RightSidebar style={{ width: rightWidth || "250px" }}>
            {detail}
          </Styled.RightSidebar>
        </>
      )}
    </>
  )
}

const Styled = {
  Wrap: styled.div`
    min-height: 100vh;
    color: #333;
    background-color: ${colors.bgPrimary};
    color: ${colors.textPrimary};
  `,
  Header: styled.div``,
  Footer: styled.div``,
  Main: styled.main`
    background-color: ${colors.bgPrimary};
    min-height: calc(100vh - 50px); // Adjust based on header/footer height
    display: flex;
  `,
  Center: styled.div`
    display: flex;
    flex: 1; // Allow content to take remaining space
    position: relative;
    width: 100%;
  `,

  ResizeLine: styled.div`
    width: 5px;
    background-color: ${colors.borderPrimary};
    cursor: ew-resize;
    position: relative;
    z-index: 10;
  `,
  Sidebar: styled.div`
    background-color: ${colors.bgPrimary};
    border-right: 1px solid ${colors.borderPrimary};
  `,
  RightSidebar: styled.div`
    width: 250px;
    background-color: ${colors.bgPrimary};
    border-left: 1px solid ${colors.borderPrimary};
  `,

  Content: styled.div`
    flex: 1; // Allow content to take remaining space
    background-color: ${colors.bgPrimary};

    height: calc(100vh - 50px); // Adjust based on header height
    overflow: auto; // Prevent overflow
  `,
}
