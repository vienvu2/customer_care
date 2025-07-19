"use client"
import styled from "styled-components"
import { Button } from "@/atom/button"
import { Input } from "@/atom/input"
import { ThemeToggle } from "@/atom/theme-toggle"
import { colors } from "@/store/theme"
import { useUIStore } from "@/store/ui"
import { Bell, PanelRightClose, PanelRightOpen, Plus } from "lucide-react"
import { Modal } from "@/components/modal"
import { useState } from "react"
import { Card, Col, Row } from "@/components/style"

export const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Styled.Wrap>
      <Styled.Left>
        <Styled.MenuToggle>
          {sidebarOpen ? (
            <PanelRightClose
              color={colors.textPrimary}
              onClick={() => setSidebarOpen(false)}
            />
          ) : (
            <PanelRightOpen
              color={colors.textPrimary}
              onClick={() => setSidebarOpen(true)}
            />
          )}
        </Styled.MenuToggle>
      </Styled.Left>
      <Styled.Center>
        <Styled.Search>
          <Input placeholder="Tìm kiếm khách hàng, hoạt động, trạng thái ..." />
        </Styled.Search>
        <Button
          onClick={() => {
            setIsOpen(true) 
          }}
        >
          <Plus size={20} />
          Tạo nhanh
        </Button>
      </Styled.Center>
      <Styled.Right>
        <ThemeToggle />
        <Bell color="white" size={14} />
      </Styled.Right>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title="Tạo nhanh"
        width={300}
      >
        <Row>
          <Col span={12}>
            <Button block>
              <Plus size={20} />
              Tạo khách hàng tiềm năng
            </Button>
          </Col>
          <Col span={12}>
            <Button block>
              <Plus size={20} />
              Tạo cơ hội
            </Button>
          </Col>
          <Col span={12}>
            <Button block>
              <Plus size={20} />
              Tạo hợp đồng
            </Button>
          </Col>
          <Col span={12}>
            <Button block>
              <Plus size={20} />
              Tạo hóa đơn
            </Button>
          </Col>
        </Row>
      </Modal>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    padding: 10px 20px;
    background-color: ${colors.bgPrimary};
    border-bottom: 1px solid ${colors.borderPrimary};
  `,
  MenuToggle: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
      color: ${colors.primary};
    }
  `,

  Center: styled.div`
    max-width: 600px;
    width: 100%;
    align-items: center;
    display: flex;
    align-items: center;

    input {
      flex-grow: 1;
      margin-right: 10px;
    }

    button {
      margin-left: 10px;
    }
  `,

  Search: styled.div`
    flex-grow: 1;
    align-items: center;
    display: flex;
    align-items: center;
  `,

  Left: styled.div`
    align-items: center;
    display: flex;
    align-items: center;
  `,
  Right: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
}
