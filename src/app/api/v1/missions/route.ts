import { NextResponse } from 'next/server';
import { ShoppingMissionRequestSchema } from '@/lib/zodSchemas';
import { dbStore } from '@/lib/services/dbStore';

export async function GET() {
  const missions = dbStore.getMissions();
  return NextResponse.json({
    success: true,
    count: missions.length,
    missions,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ShoppingMissionRequestSchema.parse(body);

    const newMission = dbStore.addMission({
      title: validated.title,
      category: validated.category,
      budgetMax: validated.budgetMax,
      priorityKey: validated.priorityKey,
      conditionPreference: validated.conditionPreference,
      deadlineDays: validated.deadlineDays,
    });

    return NextResponse.json({
      success: true,
      message: 'Shopping Mission created successfully',
      mission: newMission,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message || 'Mission creation failed' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Mission ID required' }, { status: 400 });
    }

    const deleted = dbStore.deleteMission(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
