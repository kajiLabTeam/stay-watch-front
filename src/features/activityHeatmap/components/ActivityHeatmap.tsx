import { useDocumentTitle } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  DISPLAY_HOUR_END,
  HOUR_END,
  HOUR_RANGE,
  HOUR_START,
  THEME_COLOR,
  buildGradient,
  getWeekday,
  probToAlpha,
} from '../utils';
import ErrorMessage from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { ActivityProbabilitiesResponse } from '@/types/activity';
import { endpoints } from '@/utils/endpoint';

const useCurrentTimePercent = (): number | null => {
  const calc = () => {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    if (hours < HOUR_START || hours > DISPLAY_HOUR_END) return null;
    return ((hours - HOUR_START) / HOUR_RANGE) * 100;
  };
  const [percent, setPercent] = useState<number | null>(calc);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const delay = 60_000 - (Date.now() % 60_000);

    const timeoutId = setTimeout(() => {
      setPercent(calc());
      intervalId = setInterval(() => setPercent(calc()), 60_000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return percent;
};

const TIME_LABELS = [9, 12, 15, 18, 20];

const ActivityHeatmap = () => {
  useDocumentTitle('活動予報ヒートマップ');

  const {
    data: response,
    error,
    isLoading,
  } = useGetAPI<ActivityProbabilitiesResponse>(
    `${endpoints.activityProbabilities}?weekday=${getWeekday()}`,
  );
  const currentTimePercent = useCurrentTimePercent();

  if (isLoading) return <Loading message='活動予報を取得中...' />;
  if (error || !response) return <ErrorMessage message='活動予報の取得に失敗しました' />;

  const activities = response.data;

  return (
    <div className='mx-auto px-1 py-3 md:p-6'>
      <h1 className='mb-4 text-lg font-bold md:mb-6 md:text-2xl'>活動予報ヒートマップ</h1>
      <div className='rounded-lg bg-white px-2 py-3 shadow md:p-6'>
        {/* 時刻ヘッダー */}
        <div className='flex items-center gap-1 md:gap-4'>
          <div className='w-16 shrink-0 md:w-36' />
          <div className='relative flex-1'>
            <div className='relative h-5 text-xs text-gray-500 md:text-sm'>
              {TIME_LABELS.map((hour) => (
                <span
                  key={hour}
                  className='absolute -translate-x-1/2'
                  style={{ left: `${((hour - HOUR_START) / HOUR_RANGE) * 100}%` }}
                  aria-label={`${hour}時`}
                >
                  {hour}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* ヒートマップ行 */}
        <div className='mt-2 flex gap-1 md:mt-3 md:gap-4'>
          {/* ラベル列 */}
          <div className='flex w-16 shrink-0 flex-col gap-1 md:w-36 md:gap-2'>
            {activities.map((activity) => (
              <div
                key={activity.activity_name}
                className='h-8 truncate text-right text-xs font-medium leading-8 md:h-12 md:text-base md:leading-[3rem]'
                title={activity.activity_name}
              >
                {activity.activity_name}
                <span className='sr-only'>
                  {activity.probabilities
                    .slice(HOUR_START, HOUR_END)
                    .map((p, i) => `${HOUR_START + i}時 ${Math.round(p * 100)}%`)
                    .join(', ')}
                </span>
              </div>
            ))}
          </div>
          {/* グラデーション列 + 現在時刻ライン */}
          <div className='relative flex-1'>
            {currentTimePercent !== null && (
              <div
                className='pointer-events-none absolute top-0 z-10 h-full w-0.5 bg-red-500'
                style={{ left: `${currentTimePercent}%` }}
              />
            )}
            <div className='flex flex-col gap-1 md:gap-2'>
              {activities.map((activity) => (
                <div
                  key={activity.activity_name}
                  className='h-8 rounded md:h-12'
                  style={{ background: buildGradient(activity.probabilities) }}
                  aria-hidden='true'
                />
              ))}
            </div>
          </div>
        </div>
        {/* 凡例 */}
        <div className='mt-4 flex items-center justify-end gap-2 text-xs text-gray-500'>
          <span>低</span>
          <div className='flex gap-px'>
            {[0, 0.025, 0.05, 0.075, 0.1].map((val) => (
              <div
                key={val}
                className='h-4 w-8'
                style={{ backgroundColor: `rgba(${THEME_COLOR}, ${probToAlpha(val)})` }}
              />
            ))}
          </div>
          <span>高</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
