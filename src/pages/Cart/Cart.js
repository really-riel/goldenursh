import { useStoreState } from "easy-peasy";
import React from "react";
import emptyCart from "../../assets/emptyCart.svg";
import { motion } from "framer-motion";
import { FaAlignRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
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
  const { cartItems } = useStoreState((state) => state.cart);
  return (
    <main className="Cart">
      {cartItems.length > 0 ? (
        <section className="currentOrders">
          <h2>Here are your Orders</h2>
          <p>
            Proceed with your <br /> Order
          </p>
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
