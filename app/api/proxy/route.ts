import { NextRequest } from 'next/server';

/**
 * Proxy route — fetches an external site and serves it through this domain.
 *
 * External sites that send X-Frame-Options: DENY or frame-ancestors 'none'
 * block iframe embedding. By proxying through our own domain, the browser
 * sees our headers (which allow framing) instead of theirs.
 *
 * Usage: /api/proxy?url=https://example.com
 *
 * Security: Only allows specific whitelisted domains to prevent open proxy abuse.
 */

const ALLOWED_HOSTS = [
  'whatshouldido-five.vercel.app',
  'convert-py.vercel.app',
  'companion-hike.onrender.com',
  'filipino-profanity-api-latest.vercel.app',
];

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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
    return new Response(JSON.stringify({ error: 'Only HTTPS URLs are allowed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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
        Accept: request.headers.get('accept') || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    const contentType = upstream.headers.get('content-type') || 'text/html';

    // Strip frame-blocking headers from the upstream response
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    headers.set('X-Content-Type-Options', 'nosniff');
    // Explicitly allow framing — this overrides any DENY from upstream
    headers.delete('x-frame-options');
    headers.delete('content-security-policy');

    const body = await upstream.arrayBuffer();

    return new Response(body, {
      status: upstream.status,
      headers,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch upstream site' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
