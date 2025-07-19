"use client"

import { useEffect, useState } from "react"
import { ListPage, Layout } from "@/containers/wrap"
import { Table } from "@/components/table"
import { Button } from "@/atom/button"
import useList from "@/hook/list"
import { User } from "@prisma/client"

export default function Home() {
  const { list, loading } = useList<User>("users")

  const [userDetail, setUserDetail] = useState<User | null>(null)

  return (
    <ListPage detail={userDetail ? <UserDetail user={userDetail} /> : null}>
      <Table<User>
        list={list}
        onRowClick={(user) => setUserDetail(user)}
        columns={[
          {
            key: "id",
            label: "ID",
            width: "50px",
            align: "left",
            render: (user) => user.id,
          },
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
