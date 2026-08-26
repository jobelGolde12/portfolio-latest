import { rewriteHtml } from '@/lib/proxy-rewrite';

/**
 * Health check endpoint for the proxy route.
 *
 * Checks that all whitelisted upstream sites are reachable and
 * returns their status. Useful for monitoring and debugging.
 *
 * Usage: GET /api/proxy/health
 */

const ALLOWED_HOSTS = [
  { hostname: 'whatshouldido-five.vercel.app', label: 'TaskMind' },
  { hostname: 'convert-py.vercel.app', label: 'Convert' },
  { hostname: 'companion-hike.onrender.com', label: 'TrailMates' },
  { hostname: 'filipino-profanity-api-latest.vercel.app', label: 'Profanity API' },
];

interface SiteStatus {
  label: string;
  hostname: string;
  status: 'ok' | 'error' | 'timeout';
  statusCode?: number;
  latencyMs?: number;
  error?: string;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: SiteStatus[] = [];

  const checks = ALLOWED_HOSTS.map(async (site) => {
    const url = `https://${site.hostname}/`;
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PortfolioHealthCheck/1.0)',
        },
        redirect: 'follow',
      });
      clearTimeout(timeout);

      results.push({
        label: site.label,
        hostname: site.hostname,
        status: res.ok ? 'ok' : 'error',
        statusCode: res.status,
        latencyMs: Date.now() - start,
      });
    } catch (err) {
      const isTimeout =
        err instanceof DOMException && err.name === 'AbortError';
      results.push({
        label: site.label,
        hostname: site.hostname,
        status: isTimeout ? 'timeout' : 'error',
        latencyMs: Date.now() - start,
        error: isTimeout ? 'Request timed out (10s)' : String(err),
      });
    }
  });

  await Promise.all(checks);

  const allOk = results.every((r) => r.status === 'ok');

  return Response.json(
    {
      healthy: allOk,
      checkedAt: new Date().toISOString(),
      sites: results,
    },
    {
      status: allOk ? 200 : 207,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
