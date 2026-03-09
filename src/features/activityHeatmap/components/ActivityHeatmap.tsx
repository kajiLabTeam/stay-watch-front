import { useDocumentTitle } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { mockActivityProbabilities } from '../mockData';

const THEME_COLOR = '42, 171, 176'; // staywatch-main (#2AABB0) in RGB

const buildGradient = (probabilities: number[]): string => {
  const stops = probabilities.map((prob, i) => {
    const percent = (i / (probabilities.length - 1)) * 100;
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

const TIME_LABELS = [
  { label: '0時', position: '0%' },
  { label: '6時', position: '25%' },
  { label: '12時', position: '50%' },
  { label: '18時', position: '75%' },
  { label: '24時', position: '100%' },
];

const ActivityHeatmap = () => {
  useDocumentTitle('活動確率ヒートマップ');

  // TODO: API接続時にuseGetAPIに差し替え
  const activities = mockActivityProbabilities;
  const currentTimePercent = useCurrentTimePercent();

  return (
    <div className='mx-auto max-w-6xl p-6'>
      <h1 className='mb-6 text-2xl font-bold'>活動確率ヒートマップ</h1>
      <div className='rounded-lg bg-white p-4 shadow'>
        {/* 時刻ヘッダー */}
        <div className='flex items-center gap-2'>
          <div className='w-28 shrink-0' />
          <div className='relative flex-1'>
            <div className='flex justify-between text-xs text-gray-500'>
              {TIME_LABELS.map(({ label }) => (
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
                key={activity.activityName}
                className='h-8 truncate text-right text-sm font-medium leading-8'
                title={activity.activityName}
              >
                {activity.activityName}
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
                  key={activity.activityName}
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
