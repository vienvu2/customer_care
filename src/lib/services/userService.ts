import { prisma } from '../prisma'
import { User } from '@prisma/client'

export class UserService {
    static async getAllUsers (): Promise<User[]> {
        try {
            return await prisma.user.findMany({
                orderBy: { createdAt: 'desc' }
            })
        } catch (error) {
            console.error('Error fetching users:', error)
            throw new Error('Failed to fetch users')
        }
    }

    static async getUserById (id: number): Promise<User> {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                // include: {
                //     tickets: {
                //         include: {
                //             messages: true
                //         }
                //     }
                // }
            })

            if (!user) {
                throw new Error('User not found')
            }
            return user
        } catch (error) {
            console.error('Error fetching user:', error)
            throw error
        }
    }

    static async createUser (userData: {
        email: string
        phoneNumber: string
        username: string
        password: string
        fullName: string
        role: string
    }): Promise<User> {
        try {
            // Check if email already exists
            const existingUser = await prisma.user.findUnique({
                where: { email: userData.email }
            })

            if (existingUser) {
                throw new Error('Email already exists')
            }

            return await prisma.user.create({
                data: userData
            })
        } catch (error) {
            console.error('Error creating user:', error)
            throw error
        }
    }

    static async updateUser (
        id: number,
        userData: Partial<{
            name: string
            email: string
            phone: string
            // role: UserRole
        }>
    ): Promise<User> {
        try {
            return await prisma.user.update({
                where: { id },
                data: userData
            })
        } catch (error) {
            console.error('Error updating user:', error)
            throw error
        }
    }

    static async deleteUser (id: number): Promise<void> {
        try {
            await prisma.user.delete({
                where: { id }
            })
        } catch (error) {
            console.error('Error deleting user:', error)
            throw error
        }
    }
}