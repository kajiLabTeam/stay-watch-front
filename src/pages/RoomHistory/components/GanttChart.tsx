import { CustomChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useCallback, useMemo } from 'react';
import { createGanttChartData, createGanttChartOption, getChartHeight } from '../utils/ganttChart';
import { StayTime } from '@/types/ganttStayLog';

echarts.use([CustomChart, GridComponent, TooltipComponent, CanvasRenderer]);

interface GanttChartProps {
  stayTimes: StayTime[];
}

function GanttChart({ stayTimes }: GanttChartProps) {
  const chartData = useMemo(() => createGanttChartData(stayTimes), [stayTimes]);
  const chartHeight = getChartHeight(stayTimes.length);

  // echarts は DOM 要素に紐づく外部ライブラリなので、ref コールバックで初期化・破棄する
  const chartRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;

      const chart = echarts.init(element);
      chart.setOption(createGanttChartOption(chartData));

      // ウィンドウ/コンテナのサイズ変更に追従する
      const observer = new ResizeObserver(() => chart.resize());
      observer.observe(element);

      return () => {
        observer.disconnect();
        chart.dispose();
      };
    },
    [chartData],
  );

  return (
    <div>
      <div
        ref={chartRef}
        style={{ height: chartHeight, width: '100%', maxWidth: '83.34vw', marginTop: '100px' }}
      />
    </div>
  );
}

export default GanttChart;
