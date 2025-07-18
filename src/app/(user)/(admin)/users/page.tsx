"use client"

import { useEffect } from "react"
import useList from "@/hook/user"
import { Layout } from "@/containers/wrap"
import { Table } from "@/components/table"
import { Button } from "@/atom/button"

export default function Home() {
  const { fetchUsers, createUser, users, loading } = useList()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Customer Care System</h2>

      <Button
        onClick={() =>
          createUser({
            fullName: "Test User",
            email: "test" + Math.random() + "@example.com",
            username: "testuser" + Math.random(),
            password: "password123",
            phoneNumber: "1234567890" + Math.random(),
            role: "user",
          })
        }
      >
        Add Test User
      </Button>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          <h3>Users ({users.length})</h3>
          {/* <ul>
            {users.map((user, idx) => (
              <li key={user.id + "" + idx}>
                {user.fullName} - {user.email}
              </li>
            ))}
          </ul> */}
          <Table
            list={users}
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
        </div>
      )}
    </div>
  )
}
