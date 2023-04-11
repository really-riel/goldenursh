import React from "react";
import { BsPerson } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const TabletNav = () => {
  return (
    <div className="tabletNav">
      <NavLink to={"/cart"}>
        <motion.button whileTap={{ scale: 0.8 }}>
          <FiShoppingCart />
        </motion.button>
      </NavLink>
      <NavLink to={"/profile"}>
        <motion.button whileTap={{ scale: 0.8 }}>
          <BsPerson />
        </motion.button>
      </NavLink>
    </div>
  );
};

export default TabletNav;
