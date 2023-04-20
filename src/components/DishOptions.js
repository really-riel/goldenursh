import React from "react";
import { FaAd, FaMinus, FaPlus } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";

const DishOptions = ({
  heading,
  dishOptions,
  setDish,
  setDishPrice,
  dishPrice,
}) => {
  return (
    <>
      <div className="heading">
        {heading.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
      <div className="selectContainer">
        <div className="selectWrapper">
          <select
            onChange={(e) =>
              setDish(e.target.value) &
              setDishPrice(e.target.selectedOptions[0].dataset.price)
            }
          >
            <option value="">select</option>
            {dishOptions.map((options, index) => (
              <option
                key={index}
                value={options.foodType}
                data-price={options.foodPrice}
              >
                {options.foodType}
              </option>
            ))}
          </select>
        </div>
        <div className="qtySelectorWrapper">
          <div className="qtySelector">
            <div className="minusQty">
              <FaMinus />
            </div>
            <p>1</p>
            <div className="plusQty">
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="price">
          <p>
            <TbCurrencyNaira display={dishPrice ? "inline" : "none"} />
            {dishPrice}
          </p>
        </div>
      </div>
    </>
  );
};

export default DishOptions;
