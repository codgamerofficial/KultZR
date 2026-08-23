// Qikink Official Open REST API Client
// Credentials must only come from server-side environment variables.

const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;
const QIKINK_BASE_URL = process.env.QIKINK_API_BASE_URL || 'https://api.qikink.com/v2';

function assertConfigured() {
  if (!QIKINK_CLIENT_ID || !QIKINK_CLIENT_SECRET) {
    throw new Error('Qikink integration is not configured. Add QIKINK_CLIENT_ID and QIKINK_CLIENT_SECRET to server environment variables.');
  }
}

export async function qikinkFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  assertConfigured();

  const url = `${QIKINK_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('X-Qikink-Client-Id', QIKINK_CLIENT_ID!);
  headers.set('X-Qikink-Client-Secret', QIKINK_CLIENT_SECRET!);
  headers.set('User-Agent', 'KultZR/1.0');

  const res = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Qikink API HTTP ${res.status} [${endpoint}]:`, errorText);
    throw new Error(`Qikink API error ${res.status}`);
  }

  return (await res.json()) as T;
}
