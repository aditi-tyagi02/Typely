import { formatDate, modeLabel } from '@/utils/format';

const ROW_LIMIT = 15;

export default function HistoryTable({ history }) {
  const rows = history.slice(-ROW_LIMIT).reverse();

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="border-b border-line px-6 py-4">
        <h2 className="text-base font-semibold">Recent tests</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Mode</th>
              <th className="px-6 py-3 text-right font-medium">WPM</th>
              <th className="px-6 py-3 text-right font-medium">Accuracy</th>
              <th className="px-6 py-3 text-right font-medium">Errors</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((record) => (
              <tr key={record.createdAt} className="transition-colors hover:bg-raised/60">
                <td className="whitespace-nowrap px-6 py-3.5 text-muted">{formatDate(record.createdAt)}</td>
                <td className="whitespace-nowrap px-6 py-3.5">
                  {modeLabel(record.durationSeconds, record.difficulty)}
                </td>
                <td className="px-6 py-3.5 text-right font-mono font-semibold text-accent">
                  {record.wpm.toFixed(1)}
                </td>
                <td className="px-6 py-3.5 text-right font-mono">{record.accuracy.toFixed(1)}%</td>
                <td className="px-6 py-3.5 text-right font-mono">{record.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
