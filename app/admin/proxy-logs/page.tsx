'use client';

import { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: string;
  ip: string;
  target: string;
  hostname: string;
  status: number;
  latencyMs: number;
  error?: string;
}

interface LogsResponse {
  count: number;
  logs: LogEntry[];
}

function statusColor(status: number): string {
  if (status >= 500) return 'text-red-400';
  if (status >= 400) return 'text-amber-400';
  if (status >= 300) return 'text-blue-400';
  return 'text-green-400';
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function truncateUrl(url: string, maxLen = 60): string {
  if (url.length <= maxLen) return url;
  return url.slice(0, maxLen - 3) + '...';
}

export default function ProxyLogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/proxy/logs');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LogsResponse = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    if (!autoRefresh) return;
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-light tracking-tight text-text-primary">
            Proxy Request Logs
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Last {data?.count ?? 0} requests · In-memory buffer (max 200)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`rounded-sm px-3 py-1.5 text-xs font-mono transition-colors ${
              autoRefresh
                ? 'bg-green-900/30 text-green-400 border border-green-800'
                : 'bg-bg-surface text-text-secondary border border-border-subtle'
            }`}
          >
            {autoRefresh ? '● Live' : '○ Paused'}
          </button>
          <button
            onClick={fetchLogs}
            className="rounded-sm bg-ink px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-sm border border-red-800 bg-red-900/20 p-4 text-sm text-red-400">
          Failed to fetch logs: {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-sm text-text-tertiary">
          Loading logs…
        </div>
      ) : !data || data.logs.length === 0 ? (
        <div className="py-20 text-center text-sm text-text-tertiary">
          No proxy requests logged yet. Visit a project to generate traffic.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-border-subtle">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-surface">
                <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  Time
                </th>
                <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  IP
                </th>
                <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  Host
                </th>
                <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  Status
                </th>
                <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  Latency
                </th>
                <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  Target
                </th>
              </tr>
            </thead>
            <tbody>
              {data.logs
                .slice()
                .reverse()
                .map((log, i) => (
                  <tr
                    key={`${log.timestamp}-${i}`}
                    className="border-b border-border-subtle last:border-0 hover:bg-bg-surface/50"
                  >
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-text-secondary">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-text-tertiary">
                      {log.ip}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-xs text-text-primary">
                      {log.hostname}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <span
                        className={`font-mono text-xs font-medium ${statusColor(log.status)}`}
                      >
                        {log.status}
                        {log.error && (
                          <span className="ml-1.5 text-text-tertiary">
                            {log.error}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-text-secondary">
                      {log.latencyMs}ms
                    </td>
                    <td
                      className="max-w-xs truncate px-4 py-2.5 font-mono text-xs text-text-tertiary"
                      title={log.target}
                    >
                      {truncateUrl(log.target)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
