export default function StatCard({ label, value, unit, icon: Icon, accent = false }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-accent/40">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
        <span>{label}</span>
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      </div>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className={`font-mono text-3xl font-semibold ${accent ? 'text-accent' : 'text-text'}`}>
          {value}
        </span>
        {unit && <span className="text-sm text-muted">{unit}</span>}
      </p>
    </div>
  );
}
