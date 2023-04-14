import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import emptyCart from "../../assets/emptyCart.svg";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CartOrderCard from "../../components/CartOrderCard";
import { useState } from "react";
import { useEffect } from "react";

const Cart = () => {
  const [subTotal, setSubTotal] = useState(null);
  const {
    cart: { cartItems },
    auth: { user },
  } = useStoreState((state) => state);
  const { clearCart } = useStoreActions((actions) => actions.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    setSubTotal(total);
  }, [cartItems]);

  const variant = {
    initial: {
      opacity: 0,
      y: -200,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  const handleOrderProcess = () => {
    user
      ? navigate("/cart/checkOut")
      : navigate("/auth/login", {
          state: "/cart",
        });
  };

  return (
    <main className="Cart">
      {cartItems.length > 0 ? (
        <section className="currentOrders">
          <h1>Here are your Orders</h1>
          <p>
            Proceed with your <br /> Order
          </p>
          <div className="orderList">
            {cartItems.map((item, index) => (
              <CartOrderCard key={index} order={item} />
            ))}
          </div>
          <button className="removeAll" onClick={() => clearCart()}>
            <RiDeleteBinFill />
            Remove All
          </button>
          <div className="subTotal">
            <p>SubTotal</p>
            <p>{subTotal}</p>
          </div>
          <button className="process" onClick={handleOrderProcess}>
            Process
          </button>
        </section>
      ) : (
        <motion.section
          variants={variant}
          initial="initial"
          animate="animate"
          className="emptyCart"
        >
          <figure>
            <img src={emptyCart} alt="emptyCart" />
            <figcaption>You haven't made any Orders</figcaption>
          </figure>
          <Link to={"/"}>
            <h2 role="button">
              <FaArrowLeft /> Back to Shopping
            </h2>
          </Link>
        </motion.section>
      )}

      <section className="Previous Orders"></section>
    </main>
  );
};

export default Cart;
