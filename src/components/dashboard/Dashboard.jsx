import { Activity, Gauge, Target, Trophy } from 'lucide-react';
import HistoryTable from '@/components/dashboard/HistoryTable';
import PerformanceCharts from '@/components/dashboard/PerformanceCharts';
import StatCard from '@/components/ui/StatCard';

const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;

function EmptyDashboard({ onStartTest }) {
  return (
    <div className="animate-fade-up rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
        <Activity className="h-7 w-7" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">No tests yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
        Finish your first typing test and your history, averages and performance charts will appear here.
      </p>
      <button
        type="button"
        onClick={onStartTest}
        className="mt-8 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
      >
        Start a test
      </button>
    </div>
  );
}

export default function Dashboard({ history, onStartTest }) {
  if (history.length === 0) {
    return <EmptyDashboard onStartTest={onStartTest} />;
  }

  const averageWpm = average(history.map((record) => record.wpm));
  const bestWpm = Math.max(...history.map((record) => record.wpm));
  const averageAccuracy = average(history.map((record) => record.accuracy));

  return (
    <div className="animate-fade-up space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Your progress across every test you have completed.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tests completed" value={history.length} icon={Activity} />
        <StatCard label="Average WPM" value={averageWpm.toFixed(1)} icon={Gauge} />
        <StatCard label="Best WPM" value={bestWpm.toFixed(1)} icon={Trophy} accent />
        <StatCard label="Average accuracy" value={averageAccuracy.toFixed(1)} unit="%" icon={Target} />
      </div>

      <PerformanceCharts history={history} />
      <HistoryTable history={history} />
    </div>
  );
}
