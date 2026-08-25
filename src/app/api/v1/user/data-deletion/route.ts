import { NextResponse } from 'next/server';
import { defaultDataPrivacyManager } from '@/lib/security/privacyManager';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId || 'demo-user';

    const result = defaultDataPrivacyManager.requestAccountErasure(userId);

    return NextResponse.json({
      success: true,
      message: 'Account erasure request received under DPDP Act provisions.',
      scheduledAt: result.scheduledAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process data deletion request' },
      { status: 500 }
    );
  }
}
