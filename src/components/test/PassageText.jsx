import { memo, useLayoutEffect, useMemo, useRef } from 'react';

const STATE_CLASS = {
  pending: 'text-muted',
  correct: 'text-correct',
  incorrect: 'text-incorrect',
};

const Word = memo(function Word({ text, typedPart, cursorAt }) {
  return (
    <span className="inline-block" data-cursor={cursorAt >= 0 || undefined}>
      {text.split('').map((char, index) => {
        let state = 'pending';
        if (index < typedPart.length) state = typedPart[index] === char ? 'correct' : 'incorrect';
        const mismatchedSpace = state === 'incorrect' && char === ' ';

        return (
          <span
            key={index}
            className={`whitespace-pre transition-colors duration-100 ${STATE_CLASS[state]} ${
              mismatchedSpace ? 'rounded-sm bg-incorrect/25' : ''
            } ${index === cursorAt ? 'caret' : ''}`}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
});

function splitIntoChunks(passage) {
  const words = passage.split(' ');
  let start = 0;
  return words.map((word, index) => {
    const text = index < words.length - 1 ? `${word} ` : word;
    const chunk = { text, start };
    start += text.length;
    return chunk;
  });
}

function alignToCursor(track) {
  const activeWord = track.querySelector('[data-cursor]');
  if (activeWord) track.style.transform = `translateY(${-activeWord.offsetTop}px)`;
}

export default function PassageText({ passage, typed, sizeClass }) {
  const chunks = useMemo(() => splitIntoChunks(passage), [passage]);
  const trackRef = useRef(null);
  const cursor = typed.length;

  useLayoutEffect(() => {
    alignToCursor(trackRef.current);
  }, [cursor]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const observer = new ResizeObserver(() => alignToCursor(track));
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative overflow-hidden font-mono leading-[1.6] select-none ${sizeClass}`}
      style={{ height: '4.8em' }}
    >
      <div ref={trackRef} className="relative transition-transform duration-300 ease-out">
        {chunks.map((chunk) => {
          const end = chunk.start + chunk.text.length;
          const inWord = cursor >= chunk.start && cursor < end;
          return (
            <Word
              key={chunk.start}
              text={chunk.text}
              typedPart={typed.slice(chunk.start, end)}
              cursorAt={inWord ? cursor - chunk.start : -1}
            />
          );
        })}
      </div>
    </div>
  );
}
