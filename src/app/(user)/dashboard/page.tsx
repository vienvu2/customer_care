'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { User, ApiResponse } from "@/lib/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const result: ApiResponse<User[]> = await response.json();
      
      if (result.success && result.data) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name: string, email: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      const result: ApiResponse<User> = await response.json();
      
      if (result.success && result.data) {
        setUsers(prev => [...prev, result.data!]);
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div>
          <h2>Customer Care System</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div>
              <h3>Users ({users.length})</h3>
              <ul>
                {users.map(user => (
                  <li key={user.id}>
                    {user.name} - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button 
          onClick={() => createUser('Test User', 'test@example.com')}
          className={styles.primary}
        >
          Add Test User
        </button>
      </main>
    </div>
  );
}