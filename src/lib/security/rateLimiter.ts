export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export class RateLimitingService {
  private requests: Map<string, number[]> = new Map();

  checkLimit(identifier: string, limit: number = 60, windowMs: number = 60000): RateLimitResult {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];

    // Filter out timestamps outside the sliding window
    const validTimestamps = timestamps.filter((t) => now - t < windowMs);

    if (validTimestamps.length >= limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetSeconds: Math.ceil((validTimestamps[0] + windowMs - now) / 1000),
      };
    }

    validTimestamps.push(now);
    this.requests.set(identifier, validTimestamps);

    return {
      allowed: true,
      limit,
      remaining: limit - validTimestamps.length,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }
}

export const defaultRateLimiter = new RateLimitingService();
