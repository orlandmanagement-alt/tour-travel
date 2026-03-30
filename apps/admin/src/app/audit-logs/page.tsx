'use client';

import { useState, useMemo } from 'react';

type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

interface AuditLog {
  id: number;
  action: string;
  actor: string;
  role: string;
  target: string;
  ip: string;
  timestamp: string;
  severity: AuditSeverity;
}

const mockLogs: AuditLog[] = [
  { id: 1, action: 'USER_LOGIN', actor: 'budi@nusantaratrip.com', role: 'SUPER_ADMIN', target: 'Auth System', ip: '180.241.12.5', timestamp: '2026-03-30T10:02:11Z', severity: 'INFO' },
  { id: 2, action: 'TOUR_PUBLISHED', actor: 'diana@nusantaratrip.com', role: 'CONTENT_EDITOR', target: 'Tour: T-BRM-000012', ip: '122.10.4.88', timestamp: '2026-03-30T09:48:33Z', severity: 'INFO' },
  { id: 3, action: 'BOOKING_CANCELLED', actor: 'siti@nusantaratrip.com', role: 'FINANCE', target: 'Booking: NSTR-74021', ip: '112.22.90.4', timestamp: '2026-03-30T09:31:55Z', severity: 'WARNING' },
  { id: 4, action: 'GATEWAY_KEY_UPDATED', actor: 'budi@nusantaratrip.com', role: 'SUPER_ADMIN', target: 'Payment Gateway: Midtrans', ip: '180.241.12.5', timestamp: '2026-03-30T08:55:12Z', severity: 'CRITICAL' },
  { id: 5, action: 'BULK_TOUR_IMPORT', actor: 'diana@nusantaratrip.com', role: 'CONTENT_EDITOR', target: '24 Tours Imported via CSV', ip: '122.10.4.88', timestamp: '2026-03-30T08:22:47Z', severity: 'WARNING' },
  { id: 6, action: 'STAFF_ROLE_CHANGED', actor: 'budi@nusantaratrip.com', role: 'SUPER_ADMIN', target: 'User: agus.guide → GUIDE', ip: '180.241.12.5', timestamp: '2026-03-30T07:50:01Z', severity: 'CRITICAL' },
  { id: 7, action: 'USER_LOGIN', actor: 'agus.guide@nusantaratrip.com', role: 'GUIDE', target: 'Auth System', ip: '36.82.44.21', timestamp: '2026-03-30T07:31:09Z', severity: 'INFO' },
  { id: 8, action: 'TOUR_DELETED', actor: 'budi@nusantaratrip.com', role: 'SUPER_ADMIN', target: 'Tour: T-KOM-000003 (deleted)', ip: '180.241.12.5', timestamp: '2026-03-29T22:17:05Z', severity: 'CRITICAL' },
];

const severityConfig: Record<AuditSeverity, { bg: string; text: string; dot: string }> = {
  INFO: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  WARNING: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  CRITICAL: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export default function AuditLogsPage() {
  const [filter, setFilter] = useState<AuditSeverity | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return mockLogs
      .filter(l => filter === 'ALL' || l.severity === filter)
      .filter(l => !search || l.action.includes(search.toUpperCase()) || l.actor.includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase()));
  }, [filter, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Audit Trail</h1>
          <p className="text-slate-500 text-sm mt-1">Every sensitive action is permanently stored and immutable.</p>
        </div>
        <button className="px-5 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search by action, actor, or target..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['ALL', 'INFO', 'WARNING', 'CRITICAL'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${filter === s ? 'bg-brand-primary text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Severity</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Actor</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Target</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 hidden xl:table-cell">IP Address</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-16 text-slate-400 font-medium">No logs match your filter.</td>
              </tr>
            ) : filtered.map((log) => {
              const sc = severityConfig[log.severity];
              return (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${sc.bg} ${sc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${log.severity === 'CRITICAL' ? 'animate-pulse' : ''}`}></span>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-700 dark:text-slate-200 text-xs">{log.action}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100 text-xs">{log.actor}</p>
                      <p className="text-slate-400 text-[10px] font-bold">{log.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs hidden lg:table-cell font-medium">{log.target}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400 hidden xl:table-cell">{log.ip}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    {new Date(log.timestamp).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
