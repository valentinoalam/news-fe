import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface Params {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const category = await prisma.category.findUnique({
        where: { id: parseInt(params.id) },
        include: {
            children: {
            include: {
                children: true
            }
            }
        }
        });

        if (!category) {
        return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
        );
        }

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to fetch category' },
        { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const body = await request.json();
        const validatedData = categorySchema.partial().parse(body);

        const category = await prisma.category.update({
        where: { id: parseInt(params.id) },
        data: validatedData,
        });

        return NextResponse.json(category);
    } catch (error) {
        if (error instanceof z.ZodError) {
        return NextResponse.json(
            { error: error.errors },
            { status: 400 }
        );
        }

        return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        await prisma.category.delete({
        where: { id: parseInt(params.id) },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
        );
    }
}
