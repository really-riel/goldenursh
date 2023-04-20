import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const YourChoiceCard = ({ item }) => {
  return (
    <div className="yourChoiceCard">
      <figure>
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={item?.image}
          alt="foodImg"
        />
      </figure>
      <p className="category">Category</p>
      <div className="info">
        <p className="title">{item?.title}:</p>
        <p className="foodItems">{item?.foodItems}</p>
      </div>{" "}
      <Link to={"/choose-order"}>View and Make your Order </Link>{" "}
    </div>
  );
};

export default YourChoiceCard;
