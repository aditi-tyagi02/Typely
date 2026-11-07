import { DIFFICULTIES } from '@/config/options';

export function formatDate(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function modeLabel(durationSeconds, difficultyId) {
  const difficulty = DIFFICULTIES.find((item) => item.id === difficultyId);
  return `${durationSeconds}s · ${difficulty ? difficulty.label : difficultyId}`;
}
