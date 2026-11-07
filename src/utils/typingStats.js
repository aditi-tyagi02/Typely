const MIN_ELAPSED_MS = 1000;
const CHARS_PER_WORD = 5;

export function countCorrectChars(typed, passage) {
  let correct = 0;
  for (let i = 0; i < typed.length; i += 1) {
    if (typed[i] === passage[i]) correct += 1;
  }
  return correct;
}

const roundTo = (value, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

export function computeStats({ typed, passage, correctKeys, incorrectKeys, elapsedMs }) {
  const minutes = Math.max(elapsedMs, MIN_ELAPSED_MS) / 60000;
  const correctChars = countCorrectChars(typed, passage);
  const totalKeys = correctKeys + incorrectKeys;

  return {
    wpm: roundTo((correctChars / CHARS_PER_WORD) / minutes),
    rawWpm: roundTo((typed.length / CHARS_PER_WORD) / minutes),
    accuracy: totalKeys === 0 ? 0 : roundTo((correctKeys / totalKeys) * 100),
    errors: incorrectKeys,
    correctChars,
    elapsedMs,
  };
}
