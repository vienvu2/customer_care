"use client"

import { useEffect, useState } from "react"
import { ListPage, Layout } from "@/containers/wrap"
import { Table } from "@/components/table"
import { Button } from "@/atom/button"
import useList from "@/hook/list"
import { User } from "@prisma/client"
import { FormStyled } from "@/components/style"

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
            key: "fullName",
            label: "Full Name",
            width: "200px",
            align: "left",
            render: (user) => user.fullName,
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
        ]}
      />
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

const UserDetail = ({ user }: { user: User }) => {
  return (
    <ListPage>
      <h2>User Detail</h2>
      <p>ID: {user.id}</p>
      <p>Full Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
      <Button onClick={() => console.log("Edit user")}>Edit User</Button>
    </ListPage>
  )
}
