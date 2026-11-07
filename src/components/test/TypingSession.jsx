import { RotateCcw } from 'lucide-react';
import PassageText from '@/components/test/PassageText';
import { useTypingSession } from '@/hooks/useTypingSession';

function LiveStat({ label, value, unit, accent = false }) {
  return (
    <div className="min-w-0 text-center sm:text-left">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-0.5 font-mono text-xl font-semibold ${accent ? 'text-accent' : 'text-text'}`}>
        {value}
        {unit && <span className="ml-0.5 text-xs font-normal text-muted">{unit}</span>}
      </p>
    </div>
  );
}

export default function TypingSession({
  passage,
  durationSeconds,
  soundEnabled,
  fontSizeClass,
  onComplete,
  onRestart,
}) {
  const { typed, status, stats, remainingSeconds } = useTypingSession({
    passage,
    durationSeconds,
    soundEnabled,
    onComplete,
    onRestart,
  });

  const hasStarted = status !== 'idle';

  return (
    <section className="animate-fade-up space-y-4">
      <div className="grid grid-cols-4 gap-2 px-1 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3">
        <LiveStat label="Time" value={Math.ceil(remainingSeconds)} unit="s" accent />
        <LiveStat label="WPM" value={hasStarted ? Math.round(stats.wpm) : '0'} />
        <LiveStat label="Accuracy" value={hasStarted ? Math.round(stats.accuracy) : '100'} unit="%" />
        <LiveStat label="Errors" value={stats.errors} />
      </div>

      <div className="rounded-2xl border border-line bg-surface px-5 py-6 shadow-lg shadow-black/5 sm:px-10 sm:py-9">
        <PassageText passage={passage} typed={typed} sizeClass={fontSizeClass} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-xs text-muted sm:text-sm">
          {status === 'idle' ? 'Start typing to begin the timer.' : 'Keep going. Backspace corrects mistakes.'}
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-200 hover:bg-raised hover:text-text sm:text-sm"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restart
          <kbd className="ml-1 hidden rounded border border-line px-1.5 py-0.5 font-mono text-xs sm:inline">Tab</kbd>
        </button>
      </div>
    </section>
  );
}
