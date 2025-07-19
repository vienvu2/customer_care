"use client"

import { useEffect, useState } from "react"
import { ListPage, Layout } from "@/containers/wrap"
import { Table } from "@/components/table"
import { Button } from "@/atom/button"
import useList from "@/hook/list"
import { User } from "@prisma/client"
import { DetailPage, Flex, FormStyled } from "@/components/style"
import * as Icon from "lucide-react"
import { colors } from "@/store/theme"
import { Modal } from "@/components/modal"

export default function Home() {
  const { list, loading } = useList<User>("users")

  const [isCreate, setIsCreate] = useState(false)

  const [userDetail, setUserDetail] = useState<User | null>(null)

  const renderDetail = () => {
    if (isCreate) {
      return <UserCreate />
    }
    if (userDetail) {
      return <UserDetail user={userDetail} />
    }
    return null
  }

  const [idDelete, setIdDelete] = useState<number | null>(null)

  return (
    <ListPage
      detail={renderDetail()}
      title="Quản Lý Người Dùng"
      actions={[
        <Button
          key="add-user"
          type="primary"
          onClick={() => {
            setIsCreate(true)
          }}
        >
          Thêm Người Dùng
        </Button>,
      ]}
    >
      <Table<User>
        list={list}
        onRowClick={(user) => setUserDetail(user)}
        columns={[
          {
            key: "name",
            label: "Full name",
            width: "200px",
            align: "left",
            render: (user) => user.name,
          },
          {
            key: "email",
            label: "Email",
            width: "250px",
            align: "left",
            render: (user) => user.email,
          },
          {
            key: "phoneNumber",
            label: "Phone Number",
            width: "150px",
            align: "left",
            render: (user) => user.phoneNumber,
          },
          {
            key: "role",
            label: "Role",
            width: "100px",
            align: "left",
            render: (user) => user.role,
          },
          {
            key: "actions",
            label: "Actions",
            width: "150px",
            align: "center",
            render: (user) => (
              <Flex>
                <Button
                  type="secondary"
                  onClick={() => {
                    setUserDetail(user)
                  }}
                >
                  <Icon.Edit size={16} />
                </Button>
                <Button
                  type="danger"
                  onClick={() => {
                    // Handle delete action
                    console.log("Delete user", user.id)
                  }}
                >
                  <Icon.Trash size={16} />
                </Button>
              </Flex>
            ),
          },
        ]}
      />
      <Modal
        isOpen={!!idDelete}
        onClose={() => {
          setIdDelete(null)
          setUserDetail(null)
        }}
        title={"Xác nhận xóa người dùng"}
        actions={[
          <Button
            key="confirm-delete"
            type="danger"
            onClick={() => {
              if (idDelete) {
                // Call delete user service
                console.log("Delete user with ID:", idDelete)
              }
              setIdDelete(null)
              setUserDetail(null)
            }}
          >
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
      </Modal>
    </ListPage>
  )
}

const UserCreate = () => {
  return (
    <FormStyled.Wrap>
      <Button onClick={() => console.log("Create user")}>Tạo Người Dùng</Button>
    </FormStyled.Wrap>
  )
}

const UserDetail = ({
  user,
  onClose,
  onDelete,
  onEdit,
}: {
  user: User
  onClose?: () => void
  onDelete?: (userId: number) => void
  onEdit?: (user: User) => void
}) => {
  return (
    <DetailPage.Wrap>
      <DetailPage.Title>
        <Icon.User2 size={24} />
        Chi tiết khách hàng
        <div style={{ flex: 1 }} />
        <Button
          type="light"
          onClick={() => {
            onClose && onClose()
            console.log("Close detail view")
          }}
        >
          <Icon.X size={20} color={colors.textPrimary} />
        </Button>
      </DetailPage.Title>
      <DetailPage.Content>
        <DetailPage.Row>
          <DetailPage.Label>Họ và tên:</DetailPage.Label>
          <DetailPage.Value>{user.name}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Email:</DetailPage.Label>
          <DetailPage.Value>{user.email}</DetailPage.Value>
        </DetailPage.Row>
        <DetailPage.Row>
          <DetailPage.Label>Số điện thoại:</DetailPage.Label>
          <DetailPage.Value>{user.phoneNumber}</DetailPage.Value>
        </DetailPage.Row>
      </DetailPage.Content>
      <DetailPage.Actions>
        <Button
          type="secondary"
          onClick={() => {
            // Handle edit action
            console.log("Edit user", user.id)
            onEdit && onEdit(user)
          }}
        >
          <Icon.Edit size={20} />
          Chỉnh sửa
        </Button>
        <Button
          type="danger"
          onClick={() => {
            onDelete && onDelete(user.id)
            // Handle delete action
          }}
        >
          <Icon.Trash size={20} />
          Xóa
        </Button>
      </DetailPage.Actions>
    </DetailPage.Wrap>
  )
}
