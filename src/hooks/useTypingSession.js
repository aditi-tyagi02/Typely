import { useEffect, useMemo, useReducer, useRef } from 'react';
import { computeStats } from '@/utils/typingStats';
import { playKeyTone } from '@/utils/sound';

const initialSession = {
  typed: '',
  correctKeys: 0,
  incorrectKeys: 0,
  startedAt: null,
  endedAt: null,
  now: 0,
};

function sessionReducer(state, action) {
  if (state.endedAt !== null && action.type !== 'tick') return state;

  switch (action.type) {
    case 'type': {
      const { char, now, passage, durationMs } = action;
      if (state.startedAt !== null && now - state.startedAt >= durationMs) {
        return { ...state, now: state.startedAt + durationMs, endedAt: state.startedAt + durationMs };
      }
      const isCorrect = char === passage[state.typed.length];
      const typed = state.typed + char;
      const finished = typed.length >= passage.length;
      return {
        ...state,
        typed,
        now,
        startedAt: state.startedAt ?? now,
        correctKeys: state.correctKeys + (isCorrect ? 1 : 0),
        incorrectKeys: state.incorrectKeys + (isCorrect ? 0 : 1),
        endedAt: finished ? now : null,
      };
    }
    case 'backspace': {
      if (state.typed.length === 0) return state;
      const typed = action.wholeWord
        ? state.typed.replace(/\S*\s*$/, '')
        : state.typed.slice(0, -1);
      return { ...state, typed };
    }
    case 'tick': {
      if (state.startedAt === null) return state;
      const limit = state.startedAt + action.durationMs;
      if (action.now >= limit) return { ...state, now: limit, endedAt: limit };
      return { ...state, now: action.now };
    }
    default:
      return state;
  }
}

const isEditingModifier = (event) => event.ctrlKey || event.metaKey || event.altKey;

export function useTypingSession({ passage, durationSeconds, soundEnabled, onComplete, onRestart }) {
  const durationMs = durationSeconds * 1000;
  const [state, dispatch] = useReducer(sessionReducer, initialSession);
  const completedRef = useRef(false);
  const keyCountsRef = useRef({ correct: 0, incorrect: 0 });

  const isRunning = state.startedAt !== null && state.endedAt === null;
  const status = state.endedAt !== null ? 'finished' : isRunning ? 'running' : 'idle';

  useEffect(() => {
    if (!isRunning) return undefined;
    const id = window.setInterval(() => {
      dispatch({ type: 'tick', now: Date.now(), durationMs });
    }, 100);
    return () => window.clearInterval(id);
  }, [isRunning, durationMs]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        onRestart();
        return;
      }
      if (event.key === 'Backspace') {
        event.preventDefault();
        dispatch({ type: 'backspace', wholeWord: isEditingModifier(event) });
        return;
      }
      if (event.key.length !== 1 || isEditingModifier(event)) return;
      event.preventDefault();
      dispatch({ type: 'type', char: event.key, now: Date.now(), passage, durationMs });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [passage, durationMs, onRestart]);

  useEffect(() => {
    const previous = keyCountsRef.current;
    if (soundEnabled) {
      if (state.incorrectKeys > previous.incorrect) playKeyTone(false);
      else if (state.correctKeys > previous.correct) playKeyTone(true);
    }
    keyCountsRef.current = { correct: state.correctKeys, incorrect: state.incorrectKeys };
  }, [state.correctKeys, state.incorrectKeys, soundEnabled]);

  const elapsedMs = state.startedAt === null ? 0 : (state.endedAt ?? state.now) - state.startedAt;

  const stats = useMemo(
    () =>
      computeStats({
        typed: state.typed,
        passage,
        correctKeys: state.correctKeys,
        incorrectKeys: state.incorrectKeys,
        elapsedMs,
      }),
    [state.typed, state.correctKeys, state.incorrectKeys, passage, elapsedMs],
  );

  useEffect(() => {
    if (status !== 'finished' || completedRef.current) return;
    completedRef.current = true;
    onComplete(stats);
  }, [status, stats, onComplete]);

  return {
    typed: state.typed,
    status,
    stats,
    remainingSeconds: Math.max(0, durationSeconds - elapsedMs / 1000),
  };
}
