import { RotateCcw, Shuffle, Trophy } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { modeLabel } from '@/utils/format';

export default function ResultsPanel({ stats, mode, personalBest, isNewBest, onRestart, onNewTest }) {
  return (
    <section className="animate-fade-up space-y-6">
      <div className="rounded-2xl border border-line bg-surface p-6 text-center shadow-lg shadow-black/5 sm:p-10">
        <p className="text-sm font-medium uppercase tracking-wider text-muted">
          Test complete · {modeLabel(mode.durationSeconds, mode.difficulty)}
        </p>

        <p className="mt-4 font-mono text-6xl font-semibold leading-none text-accent sm:text-7xl">
          {Math.round(stats.wpm)}
        </p>
        <p className="mt-3 text-lg text-muted">words per minute</p>

        {isNewBest && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-correct/15 px-4 py-1.5 text-sm font-medium text-correct">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            New personal best
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Accuracy" value={stats.accuracy.toFixed(1)} unit="%" />
        <StatCard label="Raw WPM" value={Math.round(stats.rawWpm)} />
        <StatCard label="Errors" value={stats.errors} />
        <StatCard label="Personal best" value={Math.round(personalBest)} unit="wpm" accent />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:border-accent/60 hover:bg-raised sm:w-auto"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restart
        </button>
        <button
          type="button"
          onClick={onNewTest}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:w-auto"
        >
          <Shuffle className="h-4 w-4" aria-hidden="true" />
          New test
        </button>
      </div>
    </section>
  );
}
