import React from "react";
import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";

const SummaryCard = ({ total, category, type }) => {
  const [icon, setIcon] = useState("");
  const [iconBgColor, setIconBgColor] = useState("");

  console.log(category.split(" ")[1]);

  /* switch (category.split(" ")[1]) {
    case "Sales":
      setIcon("HiChartBar");
  } */

  return (
    <div className="summaryCard">
      <div className="summaryIconContainer">
        <div className="summaryIcon"></div>
      </div>
      <div className="summaryDetails">
        <p className="number">{total}</p>
        <p className="title"> {category}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
