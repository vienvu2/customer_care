import { UserService } from '@/lib/services/userService';
import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET () {
    try {
        const users = await UserService.getAllUsers();
        return NextResponse.json({
            success: true,
            data: users
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST (request: NextRequest) {
    try {
        const body = await request.json();

        // Logic tạo user mới
        const createdUser = await UserService.createUser({
            email: body.email,
            phoneNumber: body.phoneNumber || '',
            username: body.username || '',
            password: body.password || '',
            name: body.name || '',
            role: body.role || UserRole.MARKETING, // Mặc định là USER
        });

        return NextResponse.json({
            success: true,
            data: createdUser
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create user' },
            { status: 500 }
        );
    }
}