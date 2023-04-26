import React from "react";
import { BiCalendar } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

const SalesTopCard = ({ title, label }) => {
  return (
    <div className="sales">
      <p>{title}</p>
      <div className="salesCalendarContainer">
        {label ? (
          <p className="label">{label}</p>
        ) : (
          <>
            <button>Monthly</button>
            <div className="salesCalendar">
              <BiCalendar />
              <BsChevronDown />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesTopCard;
