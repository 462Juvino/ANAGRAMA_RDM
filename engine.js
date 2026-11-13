import { puzzles as rawPuzzles } from './puzzles.js';

export function normalizar(texto) {
  return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
}

export function podeFormar(palavra, base) {
  const estoque = {};
  for (const letra of normalizar(base)) estoque[letra] = (estoque[letra] || 0) + 1;
  for (const letra of normalizar(palavra)) {
    if (!estoque[letra]) return false;
    estoque[letra] -= 1;
  }
  return normalizar(palavra).length >= 3;
}

export const banco = rawPuzzles.map((puzzle) => ({
  ...puzzle,
  words: [...new Set(puzzle.words.map((word) => word.toLocaleLowerCase('pt-BR')))]
    .filter((word) => podeFormar(word, puzzle.base))
})).filter((puzzle) => puzzle.words.length >= 6 && puzzle.words.some((word) => normalizar(word) === normalizar(puzzle.base)));

export function embaralhar(base) {
  const letters = [...normalizar(base)];
  for (let i = letters.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

export function novaRodada(previous, seconds) {
  const options = banco.filter((puzzle) => puzzle.id !== previous?.puzzleId);
  const puzzle = (options.length ? options : banco)[Math.floor(Math.random() * (options.length || banco.length))];
  const now = Date.now();
  return {
    id: globalThis.crypto?.randomUUID?.() || String(now), puzzleId: puzzle.id,
    letters: embaralhar(puzzle.base), words: [...puzzle.words].sort((a, b) => b.length - a.length || a.localeCompare(b, 'pt-BR')),
    status: 'playing', startedAt: now, endsAt: now + Math.max(30, Math.min(1800, Number(seconds) || 180)) * 1000,
    solved: {}, revealed: {}, hints: {}, used: {}, attempts: []
  };
}

export function concluidas(state) {
  return Object.keys(state?.solved || {}).length + Object.keys(state?.revealed || {}).length;
}

export function palavraOculta(state, withLetters = false) {
  const options = (state?.words || []).filter((word) => {
    const key = normalizar(word);
    if (state.solved?.[key] || state.revealed?.[key]) return false;
    if (withLetters) {
      const hints = state.hints?.[key] || [];
      return hints.length < key.length || hints.some((shown) => !shown);
    }
    return true;
  });
  if (!options.length) return null;
  const word = options[Math.floor(Math.random() * options.length)];
  return { word, key: normalizar(word) };
}
