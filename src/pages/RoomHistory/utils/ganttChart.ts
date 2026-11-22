import type { CustomSeriesRenderItem, EChartsCoreOption } from 'echarts';
import { StayTime } from '@/types/ganttStayLog';
import { getEndOfDayUnixTime, getStartOfDayUnixTime } from '@/utils/dateUtils';

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

export interface GanttChartData {
  readonly categories: readonly string[];
  readonly seriesData: readonly {
    readonly value: readonly number[];
    readonly itemStyle: { readonly color: string; readonly borderColor: string };
  }[];
  readonly dayStart: number;
  readonly dayEnd: number;
}

const pad = (n: number): string => String(n).padStart(2, '0');

const formatDateTime = (unixTime: number): string => {
  const d = new Date(unixTime);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// グラフの高さ。人数が少ないときは1人あたりを大きく取る
export const getChartHeight = (rowCount: number): string => {
  if (rowCount < 5) return `${50 * rowCount}px`;
  if (rowCount < 10) return `${30 * rowCount}px`;
  return '100vh';
};

const renderGanttItem: CustomSeriesRenderItem = (_params, api) => {
  const categoryIndex = api.value(0) as number;
  const start = api.coord([api.value(1), categoryIndex]);
  const end = api.coord([api.value(2), categoryIndex]);
  const rowHeight = (api.size!([0, 1]) as number[])[1];
  const barHeight = rowHeight * 0.8;

  return {
    type: 'rect',
    shape: {
      x: start[0],
      y: start[1] - barHeight / 2,
      width: Math.max(end[0] - start[0], 1),
      height: barHeight,
    },
    style: api.style(),
  };
};

export const createGanttChartData = (stayTimes: readonly StayTime[]): GanttChartData => {
  // 同じ名前は同じ行にまとめる
  const categories = Array.from(new Set(stayTimes.map((s) => s.userName)));
  const first = stayTimes[0];

  return {
    categories,
    seriesData: stayTimes.map((s) => ({
      value: [categories.indexOf(s.userName), s.startAt, s.endAt],
      itemStyle: { color: s.color, borderColor: s.color },
    })),
    dayStart: first ? getStartOfDayUnixTime(first.startAt) : 0,
    dayEnd: first ? getEndOfDayUnixTime(first.endAt) : 0,
  };
};

export const createGanttChartOption = ({
  categories,
  seriesData,
  dayStart,
  dayEnd,
}: GanttChartData): EChartsCoreOption => ({
  animation: false,
  grid: { top: 0, bottom: 24, left: 80, right: 24 },
  tooltip: {
    trigger: 'item',
    formatter: (p: { value: number[] }) =>
      `入室: ${formatDateTime(p.value[1])}<br/>退室: ${formatDateTime(p.value[2])}`,
  },
  xAxis: {
    type: 'time',
    // グラフの初期値と最後値を指定
    min: dayStart,
    max: dayEnd,
    interval: SIX_HOURS_MS, // グリッドを6時間間隔に固定
    axisLabel: {
      formatter: (value: number) => `${pad(new Date(value).getHours())}:00`,
    },
    splitLine: { show: true },
  },
  yAxis: {
    type: 'category',
    data: categories,
    inverse: true,
    axisTick: { show: false },
    splitLine: { show: true },
  },
  series: [
    {
      type: 'custom',
      renderItem: renderGanttItem,
      encode: { x: [1, 2], y: 0 },
      data: seriesData,
    },
  ],
});
