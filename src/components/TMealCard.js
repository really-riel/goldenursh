import React from "react";
import StarsRating from "react-star-rate";
import { TbCurrencyNaira } from "react-icons/tb";

const TMealCard = ({ item }) => {
  return (
    <div className="tMealCardContainer">
      <div className="tMealCard">
        <img src={item?.image} alt={item?.name} />

        <p className="name">{item?.mainMeal}</p>
        <p className="extra">{item?.extra}</p>
        <StarsRating classNamePrefix="star" value={item?.rating} />
        <p className="rate">95% successful review</p>
        <p className="price">
          <TbCurrencyNaira />
          {item?.price}
        </p>
        <button>Order now</button>
      </div>
    </div>
  );
};

export default TMealCard;
