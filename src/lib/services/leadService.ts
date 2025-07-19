import { prisma } from '../prisma'
import { Lead } from '@prisma/client'

export type LeadCreateDTO = {
    fullName: string;
    email: string;
    phoneNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
    zaloId: string | null;
    viberId: string | null;
    whatsappId: string | null;
}

export class LeadService {
    static async getAll (): Promise<Lead[]> {
        try {
            return await prisma.lead.findMany({
                orderBy: { createdAt: 'desc' }
            })
        } catch (error) {
            console.error('Error fetching users:', error)
            throw new Error('Failed to fetch users')
        }
    }

    static async getList (page: number = 1, limit: number = 10): Promise<{
        data: Lead[];
        total: number;
    }> {
        console.log('Fetching leads with pagination:', { page, limit })
        try {
            const list = await prisma.lead.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            })
            const total = await prisma.lead.count()
            return {
                data: list,
                total: total
            }
        } catch (error) {
            throw new Error('Failed to fetch users')
        }
    }

    static async getById (id: number): Promise<Lead> {
        try {
            const lead = await prisma.lead.findUnique({
                where: { id },
            })

            if (!lead) {
                throw new Error('User not found')
            }
            return lead
        } catch (error) {
            console.error('Error fetching user:', error)
            throw error
        }
    }

    static async create (data: LeadCreateDTO): Promise<Lead> {
        try {
            // Check if email already exists
            const existingUser = await prisma.lead.findUnique({
                where: { email: data.email }
            })

            if (existingUser) {
                throw new Error('Email already exists')
            }

            return await prisma.lead.create({
                data: data
            })
        } catch (error) {
            console.error('Error creating user:', error)
            throw error
        }
    }

    static async createMany (
        leads: LeadCreateDTO[]
    ): Promise<Lead[]> {
        try {
            const r = await prisma.lead.createMany({
                data: leads,
                skipDuplicates: true // Skip duplicates based on unique constraints
            })
            return r as unknown as Lead[];
        } catch (error) {
            console.error('Error creating multiple users:', error)
            throw error
        }
    }

    static async update (
        id: number,
        data: Partial<LeadCreateDTO>
    ): Promise<Lead> {
        try {
            return await prisma.lead.update({
                where: { id },
                data: data
            })
        } catch (error) {
            console.error('Error updating user:', error)
            throw error
        }
    }

    static async deleteById (id: number): Promise<void> {
        try {
            await prisma.lead.delete({
                where: { id }
            })
        } catch (error) {
            console.error('Error deleting user:', error)
            throw error
        }
    }
}