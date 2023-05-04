import React from "react";

import {
  ResponsiveContainer,
  PieChart as PieChrt,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { pieData, pieDataColor } from "../../utils/data";

const PieChart = () => {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <PieChrt width={300} height={300}>
        <Pie
          data={pieData}
          dataKey={"quantity"}
          nameKey={"itemSold"}
          cx={"50%"}
          cy={"50%"}
          outerRadius={60}
          fill="#8884d8"
          className="pieFig"
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={pieDataColor[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChrt>
    </ResponsiveContainer>
  );
};

export default PieChart;
