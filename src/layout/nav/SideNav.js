import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo";
import { SlHome } from "react-icons/sl";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FiChevronDown, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const SideNav = ({ setIsSideNavOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (location) => {
    window.location.replace(`#${location}`);
    setIsSideNavOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="sideNav"
    >
      <section>
        <div>
          <Logo />
          <FaTimes onClick={() => setIsSideNavOpen(false)} />
        </div>
        <nav>
          <ul>
            <NavLink to={"/"} onClick={() => setIsSideNavOpen(false)}>
              <li>
                <SlHome /> Home
              </li>
            </NavLink>

            <li onClick={() => setIsOpen(!isOpen)}>
              <HiOutlineViewGrid />
              Categories
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </li>
            {isOpen && (
              <ul className="categoryList">
                <li onClick={() => handleScrollTo("trendingOrders")}>
                  Trending Orders
                </li>

                <li onClick={() => handleScrollTo("yourChoice")}>
                  Order based on your choice
                </li>
              </ul>
            )}

            <NavLink to={"/contact"} onClick={() => setIsSideNavOpen(false)}>
              <li>
                <MdOutlineConnectWithoutContact /> Contact
              </li>
            </NavLink>
            <NavLink
              className="cart"
              to={"/cart"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <FiShoppingCart /> Cart
              </li>
            </NavLink>
            <NavLink
              className="profile"
              to={"/profile"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <BsPerson />
                Profile
              </li>
            </NavLink>
            <NavLink to={"/auth/login"} onClick={() => setIsSideNavOpen(false)}>
              <li>
                <HiOutlineArrowRightOnRectangle /> Login
              </li>
            </NavLink>
          </ul>
        </nav>
      </section>
      <section onClick={() => setIsSideNavOpen(false)}></section>
    </motion.div>
  );
};

export default SideNav;
