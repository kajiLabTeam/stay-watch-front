import { THEME_COLOR, probToAlpha } from '../utils';

const LEGEND_VALUES = [0, 0.025, 0.05, 0.075, 0.1];

export default function HeatmapLegend() {
  return (
    <div className='mt-4 flex items-center justify-end gap-2 text-xs text-gray-500'>
      <span>低</span>
      <div className='flex gap-px'>
        {LEGEND_VALUES.map((value) => (
          <div
            key={value}
            className='h-4 w-8'
            style={{ backgroundColor: `rgba(${THEME_COLOR}, ${probToAlpha(value)})` }}
          />
        ))}
      </div>
      <span>高</span>
    </div>
  );
}
