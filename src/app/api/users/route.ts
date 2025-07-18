import { NextRequest, NextResponse } from 'next/server';

export async function GET () {
    try {
        const users = [
            { id: 1, name: 'User 1', email: 'user1@example.com' },
            { id: 2, name: 'User 2', email: 'user2@example.com' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
            { id: 3, name: 'User 3', email: '' },
        ];

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
        const newUser = {
            id: Date.now(),
            name: body.name,
            email: body.email
        };

        return NextResponse.json({
            success: true,
            data: newUser
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create user' },
            { status: 500 }
        );
    }
}