"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/auth"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { toast } from "react-toastify"
import styled from "styled-components"

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const { login, setLoading } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast("Vui lòng nhập đầy đủ thông tin!", { type: "warning" })
      return
    }

    setIsSubmitting(true)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success && result.data) {
        login(result.data.user, result.data.token)
        toast("Đăng nhập thành công!", { type: "success" })
      } else {
        toast(result.error || "Đăng nhập thất bại", { type: "error" })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast("Lỗi kết nối", { type: "error" })
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <Styled.Wrap>
        <Styled.Card>
          <Styled.Header>
            <h2>Đăng nhập</h2>
            <p>Customer Care System</p>
          </Styled.Header>

          <Styled.Form onSubmit={handleSubmit}>
            <Styled.FormGroup>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email của bạn"
                required
              />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </Styled.FormGroup>

            <Styled.Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </Styled.Button>
          </Styled.Form>
        </Styled.Card>
      </Styled.Wrap>
    </AuthGuard>
  )
}

export default LoginPage

const Styled = {
  Wrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  `,

  Card: styled.div`
    background: white;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  `,

  Header: styled.div`
    text-align: center;
    margin-bottom: 30px;

    h2 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 28px;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  FormGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    input {
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      &::placeholder {
        color: #999;
      }
    }
  `,

  Button: styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-top: 10px;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  `,
}
