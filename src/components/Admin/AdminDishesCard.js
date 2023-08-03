import React from "react";

import { TbCurrencyNaira } from "react-icons/tb";

const AdminDishesCard = ({
  item,
  setIsShowOptions,
  setDeleteItem,
  setItemType,
}) => {
  return (
    <div className="AdminDishesCard">
      <div className="mainCard">
        <figure>
          <img src={item?.image} alt={item?.name} />
        </figure>

        <div className="dishSection">
          <p>
            {item?.mainMeal} <br /> {item?.extra}
          </p>
          <p className="price">
            <TbCurrencyNaira />
            {item?.price}
          </p>
        </div>
        <div className="dishSection">
          <button className="editBtn">Edit</button>
          <div className="">
            <button
              className="deleteBtn"
              onClick={() => {
                setIsShowOptions(true);
                setDeleteItem(item);
                setItemType("dishes");
              }}
            >
              Delete
            </button>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDishesCard;
