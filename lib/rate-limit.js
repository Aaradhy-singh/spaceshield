const buckets = new Map();

export function checkRateLimit(request, limit, windowMs) {
  const now = Date.now();
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const clientKey = forwardedFor.split(',')[0].trim() || 'unknown';

  if (buckets.size > 5000) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  let bucket = buckets.get(clientKey);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(clientKey, bucket);
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: limit - bucket.count,
    retryAfterSeconds: 0,
  };
}
