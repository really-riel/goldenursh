import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChrt,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineChartData } from "../../utils/data";

const LineChart = () => {
  return (
    <ResponsiveContainer height={250} width={"90%"}>
      <LineChrt
        data={LineChartData}
        margin={{
          left: -10,
          right: 10,
          bottom: 0,
          top: 15,
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
