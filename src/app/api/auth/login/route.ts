import { LeadService } from '@/lib/services/leadService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
    try {
        const body = await request.json();

        // Logic tạo user mới
        const createdUser = await LeadService.create({
            ...body,
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

