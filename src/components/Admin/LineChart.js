import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as LineChrt,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineChartData } from "../../utils/data";
import { Legend } from "chart.js";

const LineChart = () => {
  return (
    <ResponsiveContainer height={250} width={"90%"}>
      <LineChrt
        data={LineChartData}
        margin={{
          left: -10,
          bottom: 0,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey={"period"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type={"monotone"}
          dataKey={"previousWeek"}
          stroke="#084104"
          strokeWidth={5}
        />
        <Line
          type={"monotone"}
          dataKey={"currentWeek"}
          stroke="#c4a838"
          strokeWidth={5}
        />
      </LineChrt>
    </ResponsiveContainer>
  );
};

export default LineChart;
