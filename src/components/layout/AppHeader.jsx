import { Keyboard, LayoutDashboard, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'test', label: 'Test', icon: Keyboard },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AppHeader({ view, onNavigate }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <button
          type="button"
          onClick={() => onNavigate('test')}
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-fg transition-transform duration-300 group-hover:-rotate-6">
            <Keyboard className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Typely</span>
        </button>

        <nav className="flex items-center gap-1" aria-label="Main">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? 'bg-raised text-text' : 'text-muted hover:text-text'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
