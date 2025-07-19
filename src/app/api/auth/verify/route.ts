import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/services/authService'
import { ApiResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Token không hợp lệ'
      }
      return NextResponse.json(response, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = await AuthService.verifyToken(token)

    const response: ApiResponse<typeof user> = {
      success: true,
      data: user
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Token verification error:', error)
    
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Token không hợp lệ'
    }
    
    return NextResponse.json(response, { status: 401 })
  }
}
