export const DURATIONS = [15, 30, 60, 120];

export const DIFFICULTIES = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

export const THEME_MODES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

export const FONT_SIZES = [
  { id: 'small', label: 'Small', className: 'text-sm sm:text-base' },
  { id: 'medium', label: 'Medium', className: 'text-base sm:text-xl' },
  { id: 'large', label: 'Large', className: 'text-lg sm:text-2xl' },
];

export const DEFAULT_PREFS = {
  theme: 'dark',
  sound: false,
  fontSize: 'medium',
};
