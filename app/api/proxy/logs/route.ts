import { getLogs } from '@/lib/proxy-logs';

/**
 * Returns the in-memory proxy request log buffer.
 *
 * Usage: GET /api/proxy/logs
 *
 * Useful for debugging and monitoring proxy usage.
 * Logs are stored in-memory and limited to the most recent 200 entries.
 */

export const dynamic = 'force-dynamic';

export async function GET() {
  const logs = getLogs();

  return Response.json(
    {
      count: logs.length,
      logs,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
