import { useState } from 'react';
import { Trash2, Volume2, VolumeX } from 'lucide-react';
import SegmentedControl from '@/components/ui/SegmentedControl';
import { FONT_SIZES, THEME_MODES } from '@/config/options';

function SettingsSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function SettingsPanel({ prefs, onUpdatePrefs, historyCount, onClearHistory }) {
  const [confirmingClear, setConfirmingClear] = useState(false);

  const handleClear = () => {
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }
    onClearHistory();
    setConfirmingClear(false);
  };

  return (
    <div className="animate-fade-up mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted">Preferences are saved automatically on this device.</p>
      </div>

      <SettingsSection title="Appearance" description="Switch between a light and a dark background.">
        <SegmentedControl
          label="Appearance"
          options={THEME_MODES}
          value={prefs.theme}
          onChange={(theme) => onUpdatePrefs({ theme })}
        />
      </SettingsSection>

      <SettingsSection title="Typing text" description="Size of the passage you type along with.">
        <SegmentedControl
          label="Font size"
          options={FONT_SIZES}
          value={prefs.fontSize}
          onChange={(fontSize) => onUpdatePrefs({ fontSize })}
        />
      </SettingsSection>

      <SettingsSection title="Sound" description="Play a soft tone for each keystroke. Correct keys sound higher.">
        <button
          type="button"
          role="switch"
          aria-checked={prefs.sound}
          onClick={() => onUpdatePrefs({ sound: !prefs.sound })}
          className="flex items-center gap-3 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-raised"
        >
          {prefs.sound ? (
            <Volume2 className="h-4 w-4 text-accent" aria-hidden="true" />
          ) : (
            <VolumeX className="h-4 w-4 text-muted" aria-hidden="true" />
          )}
          <span>{prefs.sound ? 'Sound on' : 'Sound off'}</span>
          <span
            className={`ml-3 flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-200 ${
              prefs.sound ? 'bg-accent' : 'bg-line'
            }`}
            aria-hidden="true"
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                prefs.sound ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </span>
        </button>
      </SettingsSection>

      <SettingsSection
        title="Data"
        description={`${historyCount} saved ${historyCount === 1 ? 'test' : 'tests'} on this device.`}
      >
        <button
          type="button"
          onClick={handleClear}
          disabled={historyCount === 0}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
            confirmingClear
              ? 'border-incorrect bg-incorrect/15 text-incorrect'
              : 'border-line text-muted hover:border-incorrect/60 hover:text-incorrect'
          }`}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {confirmingClear ? 'Click again to delete all history' : 'Clear history'}
        </button>
      </SettingsSection>
    </div>
  );
}
