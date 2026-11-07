import { useCallback, useEffect, useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import Dashboard from '@/components/dashboard/Dashboard';
import SettingsPanel from '@/components/settings/SettingsPanel';
import TypingTest from '@/components/test/TypingTest';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DEFAULT_PREFS, FONT_SIZES, THEME_MODES } from '@/config/options';

const HISTORY_KEY = 'typerush.history';
const PREFS_KEY = 'typerush.preferences';

export default function App() {
  const [view, setView] = useState('test');
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, []);
  const [storedPrefs, setStoredPrefs] = useLocalStorage(PREFS_KEY, DEFAULT_PREFS);

  const merged = { ...DEFAULT_PREFS, ...storedPrefs };
  const prefs = {
    ...merged,
    theme: THEME_MODES.some((mode) => mode.id === merged.theme) ? merged.theme : DEFAULT_PREFS.theme,
  };
  const fontSizeClass = FONT_SIZES.find((size) => size.id === prefs.fontSize)?.className ?? FONT_SIZES[1].className;

  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme;
  }, [prefs.theme]);

  const updatePrefs = useCallback(
    (patch) => setStoredPrefs((previous) => ({ ...DEFAULT_PREFS, ...previous, ...patch })),
    [setStoredPrefs],
  );

  const saveResult = useCallback((record) => setHistory((previous) => [...previous, record]), [setHistory]);

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader view={view} onNavigate={setView} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 sm:py-12">
        {view === 'test' && (
          <TypingTest
            history={history}
            soundEnabled={prefs.sound}
            fontSizeClass={fontSizeClass}
            onSaveResult={saveResult}
          />
        )}
        {view === 'dashboard' && <Dashboard history={history} onStartTest={() => setView('test')} />}
        {view === 'settings' && (
          <SettingsPanel
            prefs={prefs}
            onUpdatePrefs={updatePrefs}
            historyCount={history.length}
            onClearHistory={clearHistory}
          />
        )}
      </main>
    </div>
  );
}
