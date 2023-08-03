import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";

const AdminDrinkCard = ({
  item,
  setIsShowOptions,
  setDeleteItem,
  setItemType,
}) => {
  return (
    <div className="AdminDrinkCard">
      <div className="mainContainer">
        <figure>
          <img src={item?.image} alt="" />
        </figure>

        <div className="label">
          <p>{item.drink}</p>
          <p className="price">
            <TbCurrencyNaira /> {item.price}
          </p>
        </div>
        <div className="btnWrapper">
          <button
            className="deleteBtn"
            onClick={() => {
              setIsShowOptions(true);
              setDeleteItem(item);
              setItemType("drinks");
            }}
          >
            Delete
          </button>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDrinkCard;
