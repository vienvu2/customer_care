import { LeadService } from '@/lib/services/leadService';
import { Lead } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


export async function POST (request: NextRequest) {
    try {
        const list = await request.json();
        const createdUser = await LeadService.createMany(list.map((item: Lead) => ({
            ...item,
        })));

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

