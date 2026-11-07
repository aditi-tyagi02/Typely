/** @type {import('tailwindcss').Config} */
const channel = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: channel('bg'),
        surface: channel('surface'),
        raised: channel('raised'),
        line: channel('line'),
        text: channel('text'),
        muted: channel('muted'),
        accent: channel('accent'),
        'accent-fg': channel('accent-fg'),
        correct: channel('correct'),
        incorrect: channel('incorrect'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        blink: 'blink 1.1s steps(2, start) infinite',
      },
    },
  },
  plugins: [],
};
