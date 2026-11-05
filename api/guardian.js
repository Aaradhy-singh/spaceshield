import { checkRateLimit } from '../lib/rate-limit.js';

function json(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed.' }, 405, { Allow: 'GET' });
    }

    const url = new URL(request.url);
    const origin = request.headers.get('origin');
    if ((origin && origin !== url.origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return json({ error: 'Cross-origin requests are not allowed.' }, 403);
    }

    const query = (url.searchParams.get('q') || '').trim();
    const limitValue = Number(url.searchParams.get('limit') || 20);
    const limit = Number.isInteger(limitValue) ? Math.min(Math.max(limitValue, 1), 30) : 20;

    if (query.length < 2 || query.length > 240) {
      return json({ error: 'Search text must be between 2 and 240 characters.' }, 400);
    }

    const rate = checkRateLimit(request, 30, 60_000);
    if (!rate.allowed) {
      return json({ error: 'Too many news requests. Please wait and try again.' }, 429, {
        'Retry-After': String(rate.retryAfterSeconds),
      });
    }

    const apiKey = process.env.GUARDIAN_API_KEY;
    if (!apiKey) {
      return json({ error: 'The Guardian feed is not configured.' }, 503);
    }

    const upstreamUrl = new URL('https://content.guardianapis.com/search');
    upstreamUrl.search = new URLSearchParams({
      q: query,
      'api-key': apiKey,
      'show-fields': 'thumbnail,trailText',
      'page-size': String(limit),
    }).toString();

    try {
      const upstream = await fetch(upstreamUrl, { signal: AbortSignal.timeout(10_000) });
      const data = await upstream.json().catch(() => null);
      if (!upstream.ok || !Array.isArray(data?.response?.results)) {
        return json({ error: 'The Guardian service returned an error.' }, 502);
      }
      return json({ articles: data.response.results }, 200, {
        'X-RateLimit-Limit': '30',
        'X-RateLimit-Remaining': String(rate.remaining),
      });
    } catch {
      return json({ error: 'The Guardian service is temporarily unavailable.' }, 502);
    }
  },
};
