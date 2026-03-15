export const THEME_COLOR = '42, 171, 176'; // staywatch-main (#2AABB0) in RGB
export const HOUR_START = 9;
export const HOUR_END = 21; // slice用（20時のデータを含む）
export const DISPLAY_HOUR_END = 20;
export const HOUR_RANGE = DISPLAY_HOUR_END - HOUR_START;

// 確率値をalphaに変換: 0→0, 0.05→0.5, 0.1以上→1.0
export const probToAlpha = (prob: number): number => {
  if (prob <= 0) return 0;
  if (prob >= 0.1) return 1;
  return Math.min(prob / 0.1, 1);
};

// 24時間分の確率からHOUR_START〜HOUR_ENDの範囲をグラデーションに変換
// 各index=時刻の中心（例: index 12 → 12:00 = 11:30〜12:30の確率）
export const buildGradient = (probabilities: number[]): string => {
  const sliced = probabilities.slice(HOUR_START, HOUR_END);
  if (sliced.length === 0) return 'transparent';
  if (sliced.length === 1) return `rgba(${THEME_COLOR}, ${probToAlpha(sliced[0])})`;
  const stops = sliced.map((prob, i) => {
    const percent = ((i + 0.5) / sliced.length) * 100;
    return `rgba(${THEME_COLOR}, ${probToAlpha(prob)}) ${percent}%`;
  });
  return `linear-gradient(to right, ${stops.join(', ')})`;
};

// JSのgetDay(): 0=日,1=月,...,6=土 → MySQL WEEKDAY: 0=月,...,6=日
export const getWeekday = (): number => {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
};
