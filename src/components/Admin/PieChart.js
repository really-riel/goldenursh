import React from "react";

import { ResponsiveContainer, PieChart as PieChrt, Pie, Cell } from "recharts";
import { pieData, pieDataColor } from "../../utils/data";

const PieChart = () => {
  return (
    <ResponsiveContainer height={150}>
      <PieChrt>
        <Pie
          data={pieData}
          dataKey={"quantity"}
          nameKey={"itemSold"}
          radius={50}
          cx={"50%"}
          cy={"50%"}
          outerRadius={50}
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={pieDataColor[index]} />
          ))}
        </Pie>
      </PieChrt>
    </ResponsiveContainer>
  );
};

export default PieChart;
