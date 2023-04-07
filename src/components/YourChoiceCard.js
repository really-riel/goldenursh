import React from "react";

const YourChoiceCard = ({ item }) => {
  return (
    <div className="yourChoiceCard">
      <img src={item?.image} alt="foodImg" />
      <div className="">
        <p>Category</p>
        <div className="">
          <p>{item?.title}</p>
          <p>{item?.foodItems}</p>
        </div>
        <button>View and Make your Order</button>
      </div>
    </div>
  );
};

export default YourChoiceCard;
