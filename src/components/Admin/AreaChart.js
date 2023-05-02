import React from "react";
import {
  ResponsiveContainer,
  AreaChart as AreaChrt,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  Legend,
} from "recharts";
import { userMapData } from "../../utils/data";

const AreaChart = () => {
  return (
    <ResponsiveContainer width={"90%"} height={250}>
      <AreaChrt
        data={userMapData}
        margin={{
          left: -30,
          right: 10,
          bottom: 0,
          top: 10,
        }}
      >
        <XAxis dataKey={"period"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type={"monotone"}
          dataKey={"users"}
          stroke="#000"
          fill="#edda8b"
        />
      </AreaChrt>
    </ResponsiveContainer>
  );
};

export default AreaChart;
