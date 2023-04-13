import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useStoreState } from "easy-peasy";

const TabletNav = () => {
  const [qty, setqty] = useState(null);
  const { cartItems } = useStoreState((state) => state.cart);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    setqty(total);
  }, [cartItems]);

  return (
    <div className="tabletNav">
      <Link to={"/cart"}>
        <motion.div whileTap={{ scale: 0.8 }} className="cart">
          <FiShoppingCart />
          {qty > 0 && <p className="count">{qty}</p>}
        </motion.div>
      </Link>
      <NavLink to={"/profile"}>
        <motion.button whileTap={{ scale: 0.8 }}>
          <BsPerson />
        </motion.button>
      </NavLink>
    </div>
  );
};

export default TabletNav;
