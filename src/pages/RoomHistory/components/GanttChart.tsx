import { CustomChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import type { CustomSeriesRenderItem } from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { useCallback, useMemo } from 'react';
import { StayTime } from '@/types/ganttStayLog';
import { getEndOfDayUnixTime, getStartOfDayUnixTime } from '@/utils/dateUtils';

echarts.use([CustomChart, GridComponent, TooltipComponent, CanvasRenderer]);

//propsの型定義
type Props = {
  stayTimes: StayTime[];
};

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const pad = (n: number) => String(n).padStart(2, '0');

const formatDateTime = (unixTime: number) => {
  const d = new Date(unixTime);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// グラフの高さ。人数が少ないときは1人あたりを大きく取る
const getChartHeight = (rowCount: number) => {
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

const GanttChart = ({ stayTimes }: Props) => {
  const { categories, seriesData, dayStart, dayEnd } = useMemo(() => {
    // 同じ名前は同じ行にまとめる
    const names = Array.from(new Set(stayTimes.map((s) => s.userName)));
    const first = stayTimes[0];
    return {
      categories: names,
      seriesData: stayTimes.map((s) => ({
        value: [names.indexOf(s.userName), s.startAt, s.endAt],
        itemStyle: { color: s.color, borderColor: s.color },
      })),
      dayStart: first ? getStartOfDayUnixTime(first.startAt) : 0,
      dayEnd: first ? getEndOfDayUnixTime(first.endAt) : 0,
    };
  }, [stayTimes]);

  const chartHeight = getChartHeight(stayTimes.length);

  // echarts は DOM 要素に紐づく外部ライブラリなので、ref コールバックで初期化・破棄する
  const chartRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;

      const chart = echarts.init(element);
      chart.setOption({
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

      // ウィンドウ/コンテナのサイズ変更に追従する
      const observer = new ResizeObserver(() => chart.resize());
      observer.observe(element);

      return () => {
        observer.disconnect();
        chart.dispose();
      };
    },
    [categories, seriesData, dayStart, dayEnd],
  );

  return (
    <div>
      <div
        ref={chartRef}
        style={{ height: chartHeight, width: '100%', maxWidth: '83.34vw', marginTop: '100px' }}
      />
    </div>
  );
};

export default GanttChart;
