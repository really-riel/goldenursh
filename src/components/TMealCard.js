import React from "react";
import StarsRating from "react-star-rate";
import { TbCurrencyNaira } from "react-icons/tb";
import { motion } from "framer-motion";

const TMealCard = ({ item }) => {
  return (
    <div className="tMealCardContainer">
      <div className="tMealCard">
        <figure>
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={item?.image}
            alt={item?.name}
          />
        </figure>
        <div className="tMealBottom">
          <div className="top">
            <ul className="mealTitle">
              <li className="name">{item?.mainMeal}</li>
              <li className="extra">{item?.extra}</li>
            </ul>
            <div className="rating">
              <StarsRating classNamePrefix="star" value={item?.rating} />
              <p className="rate">95% successful review</p>
            </div>
          </div>
          <div className="bottom">
            <p className="price">
              <TbCurrencyNaira />
              {item?.price}
            </p>

            <button>Order now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TMealCard;
