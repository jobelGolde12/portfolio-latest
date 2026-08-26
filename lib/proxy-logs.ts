/**
 * Shared in-memory request log store for the proxy route.
 *
 * Both the proxy handler and the admin/logs endpoint import from
 * this module so they share the same log buffer in the same process.
 */

export interface LogEntry {
  timestamp: string;
  ip: string;
  target: string;
  hostname: string;
  status: number;
  latencyMs: number;
  error?: string;
}

const MAX_LOGS = 200;
const logs: LogEntry[] = [];

/** Append a log entry. Keeps only the most recent MAX_LOGS entries. */
export function logRequest(entry: LogEntry): void {
  logs.push(entry);
  if (logs.length > MAX_LOGS) {
    logs.splice(0, logs.length - MAX_LOGS);
  }
  // Structured console output for Vercel function logs
  console.log(
    JSON.stringify({
      level: entry.status >= 400 ? 'error' : 'info',
      msg: 'proxy_request',
      ...entry,
    }),
  );
}

/** Return a shallow copy of the current log buffer (newest last). */
export function getLogs(): LogEntry[] {
  return [...logs];
}

/** Clear all logs (useful for testing). */
export function clearLogs(): void {
  logs.length = 0;
}
