import React, { useEffect } from "react";
import { useState } from "react";
import { TbPackages } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiChartBar } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";

const SummaryCard = ({ total, category, type }) => {
  const [icon, setIcon] = useState("");
  const [iconBgColor, setIconBgColor] = useState("");

  console.log(category.split(" ")[1]);

  useEffect(() => {
    switch (category.split(" ")[1]) {
      case "Sales":
        setIconBgColor("orange");
        break;
      case "Revenue":
        setIconBgColor("skyblue");
        break;
      case "Orders":
        setIconBgColor("yellowgreen");
        break;
      case "Users":
        setIconBgColor("purple");
        break;
      default:
        break;
    }
  }, [category]);

  return (
    <div className="summaryCard">
      <div className="summaryIconContainer">
        <div className="summaryIcon" style={{ backgroundColor: iconBgColor }}>
          {(() => {
            switch (category.split(" ")[1]) {
              case "Sales":
                return <HiChartBar />;
              case "Revenue":
                return <FcMoneyTransfer />;
              case "Orders":
                return <TbPackages />;
              case "Users":
                return <IoIosPeople />;

              default:
                return null;
            }
          })()}
        </div>
      </div>
      <div className="summaryDetails">
        <p className="number">{total}</p>
        <p className="title"> {category}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
