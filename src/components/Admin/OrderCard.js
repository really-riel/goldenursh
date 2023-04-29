import React, { useEffect, useState } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { FaSyncAlt } from "react-icons/fa";
import { RiHandCoinLine } from "react-icons/ri";

const OrderCard = ({ data }) => {
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    switch (data.label) {
      case "Ordered":
        return setBgColor("skyblue");
      case "Cancelled":
        return setBgColor("pink");
      case "Processed":
        return setBgColor("yellow");
      case "Delivered":
        return setBgColor("lightGreen");

      default:
        return null;
    }
  }, [data]);

  return (
    <div className="orderCard">
      <div className="iconWrapper" style={{ backgroundColor: bgColor }}>
        {(() => {
          switch (data.label) {
            case "Ordered":
              return <HiOutlineClipboardList />;
            case "Cancelled":
              return <FcCancel />;
            case "Processed":
              return <FaSyncAlt />;
            case "Delivered":
              return <RiHandCoinLine />;

            default:
              return null;
          }
        })()}
      </div>
      <div className="detailsContainer">
        <p>{data.quantity}</p>
        <p>{data.label}</p>
      </div>
    </div>
  );
};

export default OrderCard;
