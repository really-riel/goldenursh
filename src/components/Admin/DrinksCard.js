import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiDish } from "react-icons/bi";
import { TbBabyBottle, TbBottle } from "react-icons/tb";

const DrinksCard = ({ total, category }) => {
  const [iconBgColor, setIconBgColor] = useState("");
  useEffect(() => {
    switch (category.split(" ")[1]) {
      case "Bottles":
        return setIconBgColor("juice");
      case "Drinks":
        return setIconBgColor("softDrinks");

      default:
        return setIconBgColor("dishes");
    }
  }, [category]);

  return (
    <div className="drinksCard">
      <div className={`iconWrapper ${iconBgColor}`}>
        {(() => {
          switch (category.split(" ")[1]) {
            case "Bottles":
              return <TbBabyBottle />;
            case "Drinks":
              return <TbBottle />;

            default:
              return <BiDish />;
          }
        })()}
      </div>
      <div className="detailsContainer">
        <p>{total}</p>
        <p className="category">{category}</p>
      </div>
    </div>
  );
};

export default DrinksCard;
