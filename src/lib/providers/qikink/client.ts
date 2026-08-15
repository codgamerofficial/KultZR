// Qikink Official Open REST API Client

const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID || '787412766423348';
const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET || '31f64ea6b901edcbf569e9601b789966c4716a5b74e4c753ffcb5e0b72a26873';
const QIKINK_BASE_URL = process.env.QIKINK_API_BASE_URL || 'https://api.qikink.com/v2';

export async function qikinkFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${QIKINK_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Qikink-Client-Id': QIKINK_CLIENT_ID,
    'X-Qikink-Client-Secret': QIKINK_CLIENT_SECRET,
    'User-Agent': 'KultZR-CatalogEngine/1.0',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`Qikink API HTTP ${res.status} [${endpoint}]:`, errorText);
      throw new Error(`Qikink API error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data as T;
  } catch (error: any) {
    console.error(`Qikink API network/auth error [${endpoint}]:`, error.message);
    throw error;
  }
}
