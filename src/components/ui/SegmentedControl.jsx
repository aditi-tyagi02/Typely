export default function SegmentedControl({ options, value, onChange, label }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-line bg-surface p-1"
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
              active
                ? 'bg-accent text-accent-fg shadow-sm'
                : 'text-muted hover:bg-raised hover:text-text'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
