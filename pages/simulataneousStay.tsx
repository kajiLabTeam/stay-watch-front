import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import Layout from "../components/Layout";
import TabItem from "../components/TabItem";

const GanttChart = dynamic(() => import("../components/GanttChart"), {
  ssr: false,
});

const SimulataneousStay = () => {
  return (
    <Layout>
      <div className="">
        <TabItem />
      </div>
    </Layout>
  );
};

export default SimulataneousStay;
