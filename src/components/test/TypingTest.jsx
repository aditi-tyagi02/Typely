import { useCallback, useState } from 'react';
import ResultsPanel from '@/components/test/ResultsPanel';
import TypingSession from '@/components/test/TypingSession';
import SegmentedControl from '@/components/ui/SegmentedControl';
import { DIFFICULTIES, DURATIONS } from '@/config/options';
import { generatePassage } from '@/utils/passageGenerator';

const DURATION_OPTIONS = DURATIONS.map((seconds) => ({ id: seconds, label: `${seconds}s` }));

const DEFAULT_MODE = { durationSeconds: 30, difficulty: 'medium' };

function bestWpmFor(history, mode) {
  return history
    .filter((record) => record.durationSeconds === mode.durationSeconds && record.difficulty === mode.difficulty)
    .reduce((best, record) => Math.max(best, record.wpm), 0);
}

export default function TypingTest({ history, soundEnabled, fontSizeClass, onSaveResult }) {
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [passage, setPassage] = useState(() => generatePassage(DEFAULT_MODE.difficulty));
  const [sessionKey, setSessionKey] = useState(0);
  const [result, setResult] = useState(null);

  const bumpSession = useCallback(() => {
    setSessionKey((key) => key + 1);
    setResult(null);
  }, []);

  const changeMode = (patch) => {
    const next = { ...mode, ...patch };
    setMode(next);
    if (patch.difficulty) setPassage(generatePassage(next.difficulty));
    bumpSession();
  };

  const newTest = () => {
    setPassage(generatePassage(mode.difficulty));
    bumpSession();
  };

  const handleComplete = useCallback((stats) => {
    const previousBest = bestWpmFor(history, mode);
    onSaveResult({
      createdAt: new Date().toISOString(),
      durationSeconds: mode.durationSeconds,
      difficulty: mode.difficulty,
      wpm: stats.wpm,
      rawWpm: stats.rawWpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      correctChars: stats.correctChars,
    });
    setResult({
      stats,
      mode,
      personalBest: Math.max(previousBest, stats.wpm),
      isNewBest: stats.wpm > previousBest,
    });
  }, [history, mode, onSaveResult]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {!result && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SegmentedControl
            label="Test duration"
            options={DURATION_OPTIONS}
            value={mode.durationSeconds}
            onChange={(durationSeconds) => changeMode({ durationSeconds })}
          />
          <SegmentedControl
            label="Difficulty"
            options={DIFFICULTIES}
            value={mode.difficulty}
            onChange={(difficulty) => changeMode({ difficulty })}
          />
        </div>
      )}

      {result ? (
        <ResultsPanel
          stats={result.stats}
          mode={result.mode}
          personalBest={result.personalBest}
          isNewBest={result.isNewBest}
          onRestart={bumpSession}
          onNewTest={newTest}
        />
      ) : (
        <TypingSession
          key={sessionKey}
          passage={passage}
          durationSeconds={mode.durationSeconds}
          soundEnabled={soundEnabled}
          fontSizeClass={fontSizeClass}
          onComplete={handleComplete}
          onRestart={bumpSession}
        />
      )}
    </div>
  );
}
