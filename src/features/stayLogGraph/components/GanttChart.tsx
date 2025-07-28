import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { useLayoutEffect, useRef } from 'react';
import { ChartData, StayTime } from '@/types/ganttStayLog';
import { getEndOfDayUnixTime, getStartOfDayUnixTime } from '@/utils/dateUtils';

//propsの型定義
type Props = {
  stayTimes: StayTime[];
  width: number;
  height: number;
};

const GanttChart = ({ stayTimes, width, height }: Props) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<am4charts.XYChart | null>(null);

  let chartData: ChartData[] = [];
  let currentDayStartUnixTime = 0;
  let currentDayEndUnixTime = 0;

  let isGotCurrentDayTime = false;
  stayTimes.forEach((stayTime) => {
    if (!isGotCurrentDayTime) {
      currentDayStartUnixTime = getStartOfDayUnixTime(stayTime.startAt);
      currentDayEndUnixTime = getEndOfDayUnixTime(stayTime.endAt);
      isGotCurrentDayTime = true;
    }
    chartData.push({
      name: stayTime.userName,
      color: stayTime.color,
      start: stayTime.startAt,
      end: stayTime.endAt,
    });
  });

  useLayoutEffect(() => {
    if (divRef.current) {
      const chart = am4core.create(divRef.current, am4charts.XYChart);
      if (stayTimes.length < 5) {
        chart.height = 50 * stayTimes.length;
      } else if (stayTimes.length < 10) {
        chart.height = 30 * stayTimes.length;
      }
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.width = width;

      chart.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm:ss';
      chart.data = chartData; // データの適用
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

      // グラフの初期値と最後値を指定
      dateAxis.min = currentDayStartUnixTime;
      dateAxis.max = currentDayEndUnixTime;
      dateAxis.baseInterval = {
        timeUnit: 'hour',
        count: 1,
      };
      dateAxis.gridIntervals.setAll([
        { timeUnit: 'hour', count: 6 }, // ← ★ グリッドを3時間間隔に固定
      ]);
      // dateAxis.renderer.labels.template.location = 0.0001; // この1行を消したときの違いを確認すると何の設定なのか圧倒的にイメージしやすい

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      // 適用したデータに対してy軸として設定したフィールドを指定
      // 今回はcategory
      categoryAxis.dataFields.category = 'name';
      // locationはchartのgridの位置関係を0 ~ 1で指定する
      // 試しに色々変えてみるとどこが変わるのかわかりやすい
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.minGridDistance = 10;

      const series = chart.series.push(new am4charts.ColumnSeries());
      // ガントチャートのx軸は幅を指定するので2つを指定する
      series.dataFields.openDateX = 'start';
      series.dataFields.dateX = 'end';
      series.dataFields.categoryY = 'name';
      series.columns.template.propertyFields.fill = 'color';
      series.columns.template.propertyFields.stroke = 'color';

      // // {}内でプロパティ名を書くと対応した値が利用される
      // // 改行を入れたいときは改行文字を入れる
      series.columns.template.tooltipText = '入室: {openDateX} \n 退室: {dateX}';
      // カーソルを当てたときにtooltipがカーソルに付いて動くようにする
      // fixedかpointerの二択でどう違うかは試してみるといい
      series.columns.template.tooltipPosition = 'pointer';

      // let cellSize = 150;
      // chart.events.on("datavalidated", function (ev) {
      //   let chart = ev.target;
      //   let categoryAxis = chart.yAxes.getIndex(0);
      //   let adjustHeight =
      //     chart.data.length * cellSize - categoryAxis.pixelHeight;
      //   let targetHeight = chart.pixelHeight + adjustHeight;
      //   chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      // });

      // const scrollbar = new am4charts.XYChartScrollbar();
      // chart.scrollbarX = scrollbar;
      // // 前のセクションで定義したseriesをスクロールバーのseriesにpush
      // scrollbar.series.push(series);
      // chart.cursor = new am4charts.XYCursor();
      // // 引数に与える関数が実行される
      // chart.plotContainer.events.on("doublehit", () =>
      //   dateAxis.zoom({ start: 0, end: 1 })
      // );
      chartRef.current = chart;
      return () => chart.dispose();
    }
  });

  return (
    <div>
      <div ref={divRef} style={{ height: height, width: '100%', marginTop: '100px' }} />
    </div>
  );
};

export default GanttChart;
