import { LeadService } from '@/lib/services/leadService';
import { Lead } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


export async function POST (request: NextRequest) {
    try {
        const list = await request.json();


        // Logic tạo user mới
        // const createdUser = await LeadService.create({
        //     email: body.email,
        //     phoneNumber: body.phoneNumber || '',
        //     fullName: body.fullName || '',
        //     zaloId: body.zaloId || null,
        //     viberId: body.viberId || null,
        //     whatsappId: body.whatsappId || null,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // });
        const createdUser = await LeadService.createMany(list.map((item: Lead) => ({
            email: item.email,
            phoneNumber: item.phoneNumber || '',
            fullName: item.fullName || '',
            zaloId: item.zaloId || null,
            viberId: item.viberId || null,
            whatsappId: item.whatsappId || null,
            createdAt: new Date(),
            updatedAt: new Date(),
            utmSource: item.utmSource || null,
            status: item.status || '',
            isCustomer: item.isCustomer || false,
            conversionDate: item.conversionDate ? new Date(item.conversionDate) : null,
            assignedToUserId: item.assignedToUserId || null,
            preferredServiceId: item.preferredServiceId || null,
            notes: item.notes || '',
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

