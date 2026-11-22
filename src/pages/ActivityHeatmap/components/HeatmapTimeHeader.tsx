import { HOUR_RANGE, HOUR_START } from '../utils';

const TIME_LABELS = [9, 12, 15, 18, 20];

export function HeatmapTimeHeader() {
  return (
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
  );
}
