import { NextResponse } from 'next/server';
import { PriceWatchRequestSchema } from '@/lib/zodSchemas';
import { dbStore } from '@/lib/services/dbStore';

export async function GET() {
  const watches = dbStore.getWatches();
  return NextResponse.json({
    success: true,
    count: watches.length,
    watches,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = PriceWatchRequestSchema.parse(body);

    const newWatch = dbStore.addWatch({
      productId: validated.productId,
      targetPrice: validated.targetPrice,
      notifyOnDrop: validated.notifyOnPriceDrop ?? true,
    });

    if (!newWatch) {
      return NextResponse.json(
        { success: false, error: 'Product not found in catalog database.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Price Watch created successfully',
      watch: newWatch,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message || 'Price watch creation failed' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Price Watch ID required' }, { status: 400 });
    }

    const deleted = dbStore.deleteWatch(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
