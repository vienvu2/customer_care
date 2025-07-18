"use client"

import { useEffect } from "react"
import useList from "@/hook/user"

export default function Home() {
  const { fetchUsers, createUser, users, loading } = useList()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Customer Care System</h2>

      <button
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
      </button>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          <h3>Users ({users.length})</h3>
          <ul>
            {users.map((user, idx) => (
              <li key={user.id + "" + idx}>
                {user.fullName} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
