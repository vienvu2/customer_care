import { prisma } from '../prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}

export class AuthService {
  private static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
  private static JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng')
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password)
      
      if (!isValidPassword) {
        throw new Error('Email hoặc mật khẩu không đúng')
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role 
        },
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRES_IN } as jwt.SignOptions
      )

      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...userWithoutPassword } = user

      return {
        user: userWithoutPassword,
        token
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // Verify JWT token
  static async verifyToken(token: string): Promise<Omit<User, 'password'>> {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, this.JWT_SECRET) as { 
        userId: number
        email: string
        role: string
      }

      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      })
      
      if (!user) {
        throw new Error('Người dùng không tồn tại')
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return userWithoutPassword
    } catch (error) {
      console.error('Token verification failed:', error)
      throw new Error('Token không hợp lệ')
    }
  }

  // Register new user (if needed)
  static async register(userData: {
    name: string
    email: string
    password: string
    phone?: string
  }): Promise<AuthResponse> {
    try {
      const { name, email, password, phone } = userData

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (existingUser) {
        throw new Error('Email đã được sử dụng')
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          phoneNumber: phone,
          role: 'CUSTOMER'
        }
      })

      // Generate token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role 
        },
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRES_IN } as jwt.SignOptions
      )

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return {
        user: userWithoutPassword,
        token
      }
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  // Change password
  static async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        throw new Error('Người dùng không tồn tại')
      }

      // Verify old password
      const isValidPassword = await bcrypt.compare(oldPassword, user.password)
      
      if (!isValidPassword) {
        throw new Error('Mật khẩu cũ không đúng')
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      })
    } catch (error) {
      console.error('Change password failed:', error)
      throw error
    }
  }

  // Refresh token
  static async refreshToken(token: string): Promise<AuthResponse> {
    try {
      const user = await this.verifyToken(token)
      
      const newToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role 
        },
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRES_IN } as jwt.SignOptions
      )

      return {
        user,
        token: newToken
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }
}