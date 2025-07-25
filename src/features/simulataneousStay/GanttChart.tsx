import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { useLayoutEffect, useRef, useState } from 'react';
import { ChartData, StayTime } from '@/types/ganttStayLog';

//propsの型定義
type Props = {
  stayTimes: StayTime[];
};

const getStartOfDayUnixTime = (unixTime: number): number => {
  const date = new Date(unixTime); // UNIX時間 → Dateオブジェクトに変換
  date.setHours(0, 0, 0, 0);       // 時分秒ミリ秒をすべて0に設定
  return date.getTime();           // 0時のUNIX時間（ミリ秒）を返す
}

const getEndOfDayUnixTime = (unixTime: number): number => {
  const date = new Date(unixTime); // UNIX時間 → Dateオブジェクトに変換
  date.setHours(23, 59, 59, 999);  // 23時59分59秒999ミリ秒に設定
  return date.getTime();           // その日の終わりのUNIX時間（ミリ秒）を返す
}

const GanttChart = (props: Props) => {
  // const [currentDayStartUnixTime, setCurrentDayStartUnixTime] = useState<number>(0);
  // const [currentDayEndUnixTime, setCurrentDayEndUnixTime] = useState<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<am4charts.XYChart | null>(null);

  let chartData: ChartData[] = [];
  let currentDayStartUnixTime = 0
  let currentDayEndUnixTime = 0

  let isGotCurrentDayTime = false
  props.stayTimes.forEach((stayTime) => {
    if(!isGotCurrentDayTime){
      currentDayStartUnixTime = getStartOfDayUnixTime(stayTime.startAt)
      currentDayEndUnixTime = getEndOfDayUnixTime(stayTime.endAt)
      isGotCurrentDayTime = true
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
      chart.height = 500;
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.width = 1000
      // chart.colors.list = [am4core.color("#008000")];

      chart.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm:ss';
      chart.data = chartData; // データの適用
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

      // グラフの初期値と最後値を指定
      dateAxis.min = currentDayStartUnixTime
      dateAxis.max = currentDayEndUnixTime
      // dateAxis.max = 
      // dateAxis.extraMin = 0.2;
      // dateAxis.extraMax = 0.2;
      //dateAxis.renderer.labels.template.location = 0.0001; // この1行を消したときの違いを確認すると何の設定なのか圧倒的にイメージしやすい
      
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
      <div ref={divRef} style={{ height: 600, width: '100%', marginTop: '100px' }} />
    </div>
  );
};

export default GanttChart;
