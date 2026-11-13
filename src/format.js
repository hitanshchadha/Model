export const round = (n) => (typeof n === 'number' ? Math.round(n * 100) / 100 : n);
