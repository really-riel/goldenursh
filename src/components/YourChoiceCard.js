import React from "react";

const YourChoiceCard = ({ item }) => {
  return (
    <div className="yourChoiceCard">
      <img src={item?.image} alt="foodImg" />

      <p className="category">Category</p>
      <div className="info">
        <p className="title">{item?.title}:</p>
        <p className="foodItems">{item?.foodItems}</p>
      </div>

      <button>View and Make your Order</button>
    </div>
  );
};

export default YourChoiceCard;
