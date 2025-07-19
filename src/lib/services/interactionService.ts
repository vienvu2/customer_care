import { prisma } from '../prisma'
import { Interaction } from '@prisma/client'

export type InteractionCreateDTO = {
    leadId: number;
    type: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    interactionType: string;
    initiatedByUserId: number;
}

export class InteractionService {
    static async getAll (): Promise<Interaction[]> {
        try {
            return await prisma.interaction.findMany({
                orderBy: { createdAt: 'desc' }
            })
        } catch (error) {
            console.error('Error fetching users:', error)
            throw new Error('Failed to fetch users')
        }
    }

    static async getList (page: number = 1, limit: number = 10): Promise<{
        data: Interaction[];
        total: number;
    }> {
        console.log('Fetching leads with pagination:', { page, limit })
        try {
            const list = await prisma.interaction.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            })
            const total = await prisma.interaction.count()
            return {
                data: list,
                total: total
            }
        } catch (error) {
            throw new Error('Failed to fetch users')
        }
    }

    static async getById (id: number): Promise<Interaction> {
        try {
            const interaction = await prisma.interaction.findUnique({
                where: { id },
            })

            if (!interaction) {
                throw new Error('User not found')
            }
            return interaction
        } catch (error) {
            console.error('Error fetching user:', error)
            throw error
        }
    }

    static async create (data: InteractionCreateDTO): Promise<Interaction> {
        try {
            // Check if email already exists
            // const existingUser = await prisma.interaction.findUnique({
            //     where: {}
            // })

            // if (existingUser) {
            //     throw new Error('Email already exists')
            // }

            // Omit 'id' and 'createdAt' from data before creation
            return await prisma.interaction.create({
                data: {
                    ...data

                }
            })
        } catch (error) {
            console.error('Error creating user:', error)
            throw error
        }
    }

    // static async createMany ( leads: InteractionCreateDTO[] ): Promise<Lead[]> {
    //     try {
    //         const r = await prisma.interaction.createMany({
    //             data: leads,
    //             skipDuplicates: true // Skip duplicates based on unique constraints
    //         })
    //         return r as unknown as Lead[];
    //     } catch (error) {
    //         console.error('Error creating multiple users:', error)
    //         throw error
    //     }
    // }

    // static async update (
    //     id: number,
    //     data: Partial<LeadCreateDTO>
    // ): Promise<Lead> {
    //     try {
    //         return await prisma.interaction.update({
    //             where: { id },
    //             data: data
    //         })
    //     } catch (error) {
    //         console.error('Error updating user:', error)
    //         throw error
    //     }
    // }

    static async deleteById (id: number): Promise<void> {
        try {
            await prisma.interaction.delete({
                where: { id }
            })
        } catch (error) {
            console.error('Error deleting user:', error)
            throw error
        }
    }
}