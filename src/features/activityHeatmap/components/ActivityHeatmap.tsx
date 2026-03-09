import { useDocumentTitle } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { ActivityProbabilitiesResponse } from '@/types/activity';
import { endpoints } from '@/utils/endpoint';

const THEME_COLOR = '42, 171, 176'; // staywatch-main (#2AABB0) in RGB

// 各index=時刻の中心（例: index 12 → 12:00 = 11:30〜12:30の確率）
const buildGradient = (probabilities: number[]): string => {
  if (probabilities.length === 0) return 'transparent';
  if (probabilities.length === 1) return `rgba(${THEME_COLOR}, ${probabilities[0]})`;
  const total = probabilities.length;
  const stops = probabilities.map((prob, i) => {
    const percent = ((i + 0.5) / total) * 100;
    return `rgba(${THEME_COLOR}, ${prob}) ${percent}%`;
  });
  return `linear-gradient(to right, ${stops.join(', ')})`;
};

const useCurrentTimePercent = (): number => {
  const calc = () => {
    const now = new Date();
    return ((now.getHours() * 60 + now.getMinutes()) / (24 * 60)) * 100;
  };
  const [percent, setPercent] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setPercent(calc()), 60_000);
    return () => clearInterval(id);
  }, []);

  return percent;
};

const getWeekday = (): number => {
  // JSのgetDay(): 0=日,1=月,...,6=土 → MySQL WEEKDAY: 0=月,...,6=日
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
};

const TIME_LABELS = ['0時', '6時', '12時', '18時', '24時'];

const ActivityHeatmap = () => {
  useDocumentTitle('活動確率ヒートマップ');

  const {
    data: response,
    error,
    isLoading,
  } = useGetAPI<ActivityProbabilitiesResponse>(
    `${endpoints.activityProbabilities}?weekday=${getWeekday()}`,
  );
  const currentTimePercent = useCurrentTimePercent();

  if (isLoading) return <Loading message='活動確率を取得中...' />;
  if (error || !response) return <ErrorMessage message='活動確率の取得に失敗しました' />;

  const activities = response.data;

  return (
    <div className='mx-auto max-w-6xl p-6'>
      <h1 className='mb-6 text-2xl font-bold'>活動確率ヒートマップ</h1>
      <div className='rounded-lg bg-white p-4 shadow'>
        {/* 時刻ヘッダー */}
        <div className='flex items-center gap-2'>
          <div className='w-28 shrink-0' />
          <div className='relative flex-1'>
            <div className='flex justify-between text-xs text-gray-500'>
              {TIME_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
        {/* ヒートマップ行 */}
        <div className='mt-2 flex gap-2'>
          {/* ラベル列 */}
          <div className='flex w-28 shrink-0 flex-col gap-1'>
            {activities.map((activity) => (
              <div
                key={activity.activity_name}
                className='h-8 truncate text-right text-sm font-medium leading-8'
                title={activity.activity_name}
              >
                {activity.activity_name}
              </div>
            ))}
          </div>
          {/* グラデーション列 + 現在時刻ライン */}
          <div className='relative flex-1'>
            <div
              className='pointer-events-none absolute top-0 z-10 h-full w-0.5 bg-red-500'
              style={{ left: `${currentTimePercent}%` }}
            />
            <div className='flex flex-col gap-1'>
              {activities.map((activity) => (
                <div
                  key={activity.activity_name}
                  className='h-8 rounded'
                  style={{ background: buildGradient(activity.probabilities) }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* 凡例 */}
        <div className='mt-4 flex items-center justify-end gap-2 text-xs text-gray-500'>
          <span>低</span>
          <div className='flex gap-px'>
            {[0, 0.25, 0.5, 0.75, 1.0].map((val) => (
              <div
                key={val}
                className='h-4 w-8'
                style={{ backgroundColor: `rgba(42, 171, 176, ${val})` }}
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
