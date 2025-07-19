import { AuthService } from '@/lib/services/authService'
import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Email và mật khẩu là bắt buộc'
      }
      return NextResponse.json(response, { status: 400 })
    }

    const authResult = await AuthService.login({ email, password })

    const response: ApiResponse<typeof authResult> = {
      success: true,
      data: authResult
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Login API error:', error)
    
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Đăng nhập thất bại'
    }
    
    return NextResponse.json(response, { status: 401 })
  }
}

