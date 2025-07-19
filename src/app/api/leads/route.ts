import { LeadService } from '@/lib/services/leadService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET () {
    try {
        const users = await LeadService.getAll();
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
        const createdUser = await LeadService.create({
            email: body.email,
            phoneNumber: body.phoneNumber || '',
            fullName: body.fullName || '',
            zaloId: body.zaloId || null,
            viberId: body.viberId || null,
            whatsappId: body.whatsappId || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            data: createdUser
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Tạo khách hàng tiềm năng thất bại' },
            { status: 500 }
        );
    }
}

