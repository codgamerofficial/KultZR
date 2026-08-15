import { NextResponse } from 'next/server';
import { runProductSync } from '@/lib/syncEngine';

export async function POST() {
  try {
    const summary = await runProductSync();
    return NextResponse.json({
      success: summary.status === 'COMPLETED',
      summary,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Sync engine execution failed',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const summary = await runProductSync();
    return NextResponse.json({
      success: summary.status === 'COMPLETED',
      summary,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Sync engine execution failed',
      },
      { status: 500 }
    );
  }
}
