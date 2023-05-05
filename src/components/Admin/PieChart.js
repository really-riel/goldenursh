import React from "react";

import {
  ResponsiveContainer,
  PieChart as PieChrt,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { pieData, pieDataColor } from "../../utils/data";

const PieChart = () => {
  const cellStyle = {
    stroke: "none",
    strokeWidth: 0,
  };
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
          className="pieFig"
          activeShape={"none"}
          onClick={null}
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={pieDataColor[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          formatter={(value, entry) => (
            <span
              style={{
                color: "#000",
                fontSize: "clamp(0.3rem, 0.5rem + 1vw, 1rem)",
              }}
            >
              {value}
            </span>
          )}
        />
      </PieChrt>
    </ResponsiveContainer>
  );
};

export default PieChart;
