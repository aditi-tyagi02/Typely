export const WORD_LISTS = {
  easy: [
    'the', 'and', 'for', 'you', 'with', 'this', 'that', 'have', 'from', 'they', 'will', 'one',
    'all', 'would', 'there', 'their', 'what', 'out', 'about', 'who', 'get', 'which', 'when',
    'make', 'can', 'like', 'time', 'just', 'know', 'take', 'people', 'into', 'year', 'good',
    'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
    'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
    'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
    'most', 'open', 'home', 'river', 'light', 'water', 'stone', 'quiet', 'garden', 'morning',
    'window', 'bright', 'simple', 'friend', 'paper', 'street', 'pencil', 'forest',
    'coffee', 'summer', 'winter', 'planet', 'ocean', 'bridge', 'castle', 'silver', 'golden',
  ],
  medium: [
    'practice', 'journey', 'discover', 'balance', 'history', 'culture', 'function', 'standard',
    'consider', 'pattern', 'quality', 'natural', 'orchestra', 'language', 'mountain', 'northern',
    'strategy', 'thousand', 'building', 'machine', 'learning', 'software', 'keyboard', 'letters',
    'carefully', 'remember', 'interest', 'growth', 'careful', 'patience', 'focused', 'steady',
    'harmony', 'element', 'surface', 'sequence', 'promise', 'horizon', 'freedom', 'village',
    'essential', 'delivery', 'thoughtful', 'vibrant', 'creative', 'capture', 'momentum', 'signal',
    'artistic', 'celebrate', 'durable', 'elegant', 'generous', 'imagine', 'scientist', 'resource',
  ],
  hard: [
    'extraordinary', 'bureaucracy', 'idiosyncratic', 'photosynthesis', 'entrepreneurial',
    'characteristic', 'miscellaneous', 'interdependence', 'sophisticated', 'reconnaissance',
    'onomatopoeia', 'juxtaposition', 'quintessential', 'serendipitous', 'phenomenon', 'ubiquitous',
    'labyrinthine', 'cacophony', 'kaleidoscope', 'deterministic', 'asymmetric', 'encyclopedia',
    'rhythm', 'syzygy', 'pneumonia', 'mnemonic', 'xylophone', 'zephyr', 'quixotic', 'jeopardy',
    'vexingly', 'haphazardly', 'rhythmically', 'fluorescent', 'anonymity', 'ambiguity', 'cryptic',
  ],
};

const PUNCTUATION = [',', '.', ';', ':', '!', '?'];
const SYMBOLS = ['@', '#', '$', '%', '&', '*', '(', ')', '-', '/', '+', '='];

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const chance = (probability) => Math.random() < probability;

const randomNumber = () => String(Math.floor(Math.random() * 999) + 1);

function decorateWord(word, difficulty, startOfSentence) {
  let token = startOfSentence && difficulty !== 'easy' ? word[0].toUpperCase() + word.slice(1) : word;

  if (difficulty === 'medium' && chance(0.08)) {
    token += randomItem([',', '.']);
  }

  if (difficulty === 'hard') {
    if (chance(0.12)) token += randomItem(PUNCTUATION);
    if (chance(0.06)) token = randomNumber();
    if (chance(0.04)) token = randomItem(SYMBOLS) + token;
  }

  return token;
}

export function generatePassage(difficulty, wordCount = 240) {
  const pool = WORD_LISTS[difficulty];
  const tokens = [];
  let previous = null;
  let sentenceStart = true;

  for (let i = 0; i < wordCount; i += 1) {
    let word = randomItem(pool);
    while (word === previous && pool.length > 1) word = randomItem(pool);
    previous = word;

    const token = decorateWord(word, difficulty, sentenceStart);
    tokens.push(token);

    sentenceStart = /[.!?]$/.test(token);
  }

  return tokens.join(' ');
}
