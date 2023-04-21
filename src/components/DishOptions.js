import React from "react";
import { FaAd, FaMinus, FaPlus } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import Select from "react-select";

const DishOptions = ({
  heading,
  dishOptions,
  setDish,
  setDishPrice,
  dishPrice,
  dishQty,
  setDishQty,
}) => {
  const options = dishOptions.map((data) => ({
    value: data.foodType,
    label: data.foodType,
    price: data.price,
  }));

  return (
    <>
      <div className="heading">
        {heading.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
      <div className="selectContainer">
        <div className="selectWrapper">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: "none",
                boxShadow: " 0.1rem 0.2rem 0.6rem rgba(0, 0, 0, 0.363)",
                fontSize: "1rem",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#6a5c05"
                  : base.backgroundColor,

                "&:hover": {
                  backgroundColor: state.isSelected ? "#c4a838" : "#c4a838",
                },
                "&:focus": {
                  backgroundColor: state.isSelected ? "#c4a838" : "#c4a838",
                },
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: "none",
              }),
              container: (base) => ({
                ...base,
                width: "80%",
              }),
            }}
            classNamePrefix={"react-select"}
            options={options}
            onChange={(option) =>
              setDish(option.value) & setDishPrice(option.price)
            }
          />
        </div>
        <div className="qtySelectorWrapper">
          <div className="qtySelector">
            <button
              className="minusQty"
              onClick={() => setDishQty(dishQty - 1)}
              disabled={dishQty === 1 ? true : false}
              role="button"
            >
              <FaMinus />
            </button>
            <p>{dishQty}</p>
            <button className="plusQty" onClick={() => setDishQty(dishQty + 1)}>
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="price">
          <p>
            <TbCurrencyNaira display={dishPrice ? "inline" : "none"} />
            {dishPrice * dishQty}
          </p>
        </div>
      </div>
    </>
  );
};

export default DishOptions;

{
  /* <select
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
          </select> */
}
