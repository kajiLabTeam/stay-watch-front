interface HeatmapCurrentTimeLineProps {
  percent: number;
}

export function HeatmapCurrentTimeLine({ percent }: HeatmapCurrentTimeLineProps) {
  return (
    <div
      className='pointer-events-none absolute top-0 z-10 h-full w-0.5 bg-red-500'
      style={{ left: `${percent}%` }}
    />
  );
}
