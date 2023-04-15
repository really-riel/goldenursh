import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Starrating from "react-star-rate";
import { TbCurrencyNaira } from "react-icons/tb";
import { useStoreActions } from "easy-peasy";
import { RiDeleteBinFill } from "react-icons/ri";

const CartOrderCard = ({ order }) => {
  const { increaseQuantity, decreaseQuantity, deleteItem } = useStoreActions(
    (actions) => actions.cart
  );
  return (
    <div className="cartOrderCard">
      <figure>
        <img src={order.image} alt={order.id} />
      </figure>

      <div className="orderDetails">
        <div className="">
          <p className="meal">{order.mainMeal}</p>
          <p className="meal">{order.extra}</p>
        </div>

        <p className="price">
          <TbCurrencyNaira />
          {order.price}
        </p>

        <Starrating value={order.rating} />
        <div className="">
          <h3>Category</h3>
          <p>{order.category}</p>
        </div>
        <div className="">
          <h3>TotalPacks</h3>
          <div className="quantitySection">
            <div className="minus" onClick={() => decreaseQuantity(order)}>
              <FaMinus style={{ opacity: order.quantity === 1 ? 0.3 : 1 }} />
            </div>

            <div className="quantity">{order.quantity}</div>
            <div className="add" onClick={() => increaseQuantity(order)}>
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="">
          <h3>Total amount</h3>
          <p className="price">
            <TbCurrencyNaira /> {order.price * order.quantity}
          </p>
        </div>
        <button className="remove" onClick={() => deleteItem(order)}>
          <RiDeleteBinFill /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartOrderCard;
