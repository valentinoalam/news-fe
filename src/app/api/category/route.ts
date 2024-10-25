
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

const categorySchema = z.object({
name: z.string().min(1, 'Name is required'),
slug: z.string().min(1, 'Slug is required'),
description: z.string().optional(),
parentId: z.number().nullable().optional(),
});

export async function GET() {
    try {
        // Replace with your actual database query
        const categories = await prisma.category.findMany({
        include: {
            children: {
            include: {
                children: true
            }
            }
        }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = categorySchema.parse(body);

        // Replace with your actual database query
        const category = await prisma.category.create({
        data: validatedData,
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
        return NextResponse.json(
            { error: error.errors },
            { status: 400 }
        );
        }
        
        return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
        );
    }
}
