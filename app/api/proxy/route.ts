import { NextRequest } from 'next/server';
import { rewriteHtml } from '@/lib/proxy-rewrite';

/**
 * Proxy route — fetches an external site and serves it through this domain.
 *
 * External sites that send X-Frame-Options: DENY or frame-ancestors 'none'
 * block iframe embedding. By proxying through our own domain, the browser
 * sees our headers (which allow framing) instead of theirs.
 *
 * Features:
 * - Domain whitelist to prevent open proxy abuse
 * - Per-IP rate limiting (60 requests / minute)
 * - HTML rewriting: relative asset paths (CSS, JS, images) are rewritten
 *   to route through the proxy so the proxied site renders fully.
 *
 * Usage: /api/proxy?url=https://example.com
 */

/* ─── Whitelist ─────────────────────────────────────────── */

const ALLOWED_HOSTS = [
  'whatshouldido-five.vercel.app',
  'convert-py.vercel.app',
  'companion-hike.onrender.com',
  'filipino-profanity-api-latest.vercel.app',
];

/* ─── Rate limiter (in-memory, per-IP) ──────────────────── */

const RATE_LIMIT = 60; // requests
const RATE_WINDOW_MS = 60_000; // 1 minute

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = hits.get(ip) ?? [];
  // Prune old entries
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Periodic cleanup to prevent memory leak (every 5 min)
let lastCleanup = Date.now();
function cleanupHits() {
  const now = Date.now();
  if (now - lastCleanup < 300_000) return;
  lastCleanup = now;
  for (const [ip, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length === 0) hits.delete(ip);
    else hits.set(ip, recent);
  }
}

/* ─── Route handler ─────────────────────────────────────── */

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  cleanupHits();

  // Rate limit
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Try again shortly.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate URL
  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only allow HTTPS
  if (parsed.protocol !== 'https:') {
    return new Response(
      JSON.stringify({ error: 'Only HTTPS URLs are allowed' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Whitelist check
  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return new Response(JSON.stringify({ error: 'Domain not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioPreview/1.0)',
        Accept:
          request.headers.get('accept') ??
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    const contentType = upstream.headers.get('content-type') || 'text/html';
    const isHtml =
      contentType.includes('text/html') ||
      contentType.includes('application/xhtml+xml');

    const body = await upstream.arrayBuffer();
    let responseBody: ArrayBuffer | string = body;

    if (isHtml) {
      const upstreamOrigin = `${parsed.protocol}//${parsed.hostname}`;
      const proxyBase = `/api/proxy?url=${encodeURIComponent(upstreamOrigin)}`;
      let html = new TextDecoder().decode(body);

      // Rewrite HTML asset paths to route through the proxy
      html = rewriteHtml(html, upstreamOrigin, proxyBase);

      responseBody = new TextEncoder().encode(html).buffer as ArrayBuffer;
    }

    // Strip frame-blocking headers from the upstream response
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300',
    );
    headers.set('X-Content-Type-Options', 'nosniff');
    // Explicitly allow framing — this overrides any DENY from upstream
    headers.delete('x-frame-options');
    headers.delete('content-security-policy');

    return new Response(responseBody, {
      status: upstream.status,
      headers,
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch upstream site' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
