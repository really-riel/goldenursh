import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";

const AdminDrinkCard = ({
  item,
  setIsShowOptions,
  setItemObject,
  setItemType,
  setIsShowEditOption,
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
              setItemObject(item);
              setItemType("drinks");
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsShowEditOption(true);
              setItemObject(item);
              setItemType("drinks");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDrinkCard;
