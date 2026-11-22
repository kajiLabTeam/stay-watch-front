export const getStartOfDayUnixTime = (unixTime: number): number => {
  const date = new Date(unixTime); // UNIX時間 → Dateオブジェクトに変換
  date.setHours(0, 0, 0, 0); // 時分秒ミリ秒をすべて0に設定
  return date.getTime(); // 0時のUNIX時間（ミリ秒）を返す
};

export const getEndOfDayUnixTime = (unixTime: number): number => {
  const date = new Date(unixTime); // UNIX時間 → Dateオブジェクトに変換
  date.setHours(23, 59, 59, 999); // 23時59分59秒999ミリ秒に設定
  return date.getTime(); // その日の終わりのUNIX時間（ミリ秒）を返す
};
