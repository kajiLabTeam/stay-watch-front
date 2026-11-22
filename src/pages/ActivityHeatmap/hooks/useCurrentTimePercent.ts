import { useSyncExternalStore } from 'react';
import { DISPLAY_HOUR_END, HOUR_RANGE, HOUR_START } from '../utils';

const MINUTE_MS = 60_000;

/** 分が切り替わるタイミングで通知する(外部のタイマーの購読) */
const subscribeMinuteChange = (onChange: () => void): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const scheduleNext = () => {
    timeoutId = setTimeout(
      () => {
        onChange();
        scheduleNext();
      },
      MINUTE_MS - (Date.now() % MINUTE_MS),
    );
  };
  scheduleNext();

  return () => clearTimeout(timeoutId);
};

/** 現在が UNIX エポックから数えて何分目か。同じ分の間は同じ値を返す */
const getCurrentMinute = (): number => Math.floor(Date.now() / MINUTE_MS);

const calcTimePercent = (minute: number): number | null => {
  const date = new Date(minute * MINUTE_MS);
  const hours = date.getHours() + date.getMinutes() / 60;
  if (hours < HOUR_START || hours > DISPLAY_HOUR_END) return null;
  return ((hours - HOUR_START) / HOUR_RANGE) * 100;
};

export const useCurrentTimePercent = (): number | null => {
  const minute = useSyncExternalStore(subscribeMinuteChange, getCurrentMinute);
  return calcTimePercent(minute);
};
