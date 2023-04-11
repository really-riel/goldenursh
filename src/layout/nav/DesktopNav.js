import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import TabletNav from "./TabletNav";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const DesktopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="desktopNav">
      <ul>
        <NavLink to={"/"} onClick={() => setIsOpen(false)}>
          <motion.li whileTap={{ scale: 0.8 }}>Home</motion.li>
        </NavLink>

        <motion.li
          whileTap={{ scale: 0.8 }}
          className="category"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Categories</span>
          {isOpen ? <FiChevronDown /> : <FiChevronRight />}
          {isOpen && (
            <div className="categoryList">
              <ul>
                <li onClick={() => setIsOpen(false)}>Trending List</li>
                <li onClick={() => setIsOpen(false)}>
                  Order based on your choice
                </li>
              </ul>
            </div>
          )}
        </motion.li>
        <NavLink to={"auth/login"}>
          <motion.li whileTap={{ scale: 0.8 }} onClick={() => setIsOpen(false)}>
            Login
          </motion.li>
        </NavLink>
        <TabletNav />
      </ul>
    </nav>
  );
};

export default DesktopNav;
