import { InteractionService } from '@/lib/services/interactionService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (request: NextRequest) {
    try {
        const page = request.nextUrl.searchParams.get('page') || '1';
        const limit = request.nextUrl.searchParams.get('limit') || '10';
        console.log('Fetching leads with pagination2:', { page, limit });
        const { data, total } = await InteractionService.getList(
            parseInt(page, 10),
            parseInt(limit, 10)
        );
        return NextResponse.json({
            success: true,
            data: data,
            total: total,
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
        const createdUser = await InteractionService.create({
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

