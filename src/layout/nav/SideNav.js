import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo";
import { SlHome } from "react-icons/sl";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FiChevronDown, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { FaBox, FaTimes, FaUserCog } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  RequireAdminLink,
  ShowOnLogin,
  ShowOnLogout,
} from "../../components/RequireLinks";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useStoreActions, useStoreState } from "easy-peasy";

const SideNav = ({ setIsSideNavOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUser, setIsAdmin } = useStoreActions((actions) => actions.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsSideNavOpen(false);
      setIsAdmin(false);
      deleteUser();
      toast.success("logout Successful");
    } catch (error) {
      console.error(error);
      error.code === "auth/internal-error"
        ? toast.error("check your Network")
        : toast.error(error.code.split("/")[1]);
    }
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
            <RequireAdminLink>
              <NavLink
                to={"/admin/dashboard"}
                onClick={() => setIsSideNavOpen(false)}
              >
                <li>
                  <FaUserCog /> Admin
                </li>
              </NavLink>
            </RequireAdminLink>

            <li onClick={() => setIsOpen(!isOpen)}>
              <HiOutlineViewGrid />
              Categories
              {isOpen ? <FiChevronDown /> : <FiChevronRight />}
            </li>
            {isOpen && (
              <ul className="categoryList">
                <a
                  href="#trendingOrders"
                  onClick={() => setIsSideNavOpen(false)}
                >
                  <li>Trending Orders</li>
                </a>
                <a href="#yourChoice" onClick={() => setIsSideNavOpen(false)}>
                  <li>Order based on your choice</li>
                </a>
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
            <NavLink
              className="orders"
              to={"/orders"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <FaBox />
                Orders
              </li>
            </NavLink>
            {/* login */}
            <ShowOnLogout>
              <NavLink
                to={"/auth/login"}
                onClick={() => setIsSideNavOpen(false)}
              >
                <li>
                  <HiOutlineArrowRightOnRectangle /> Login
                </li>
              </NavLink>
            </ShowOnLogout>

            {/* logout */}
            <ShowOnLogin>
              <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                <HiOutlineArrowLeftOnRectangle /> Logout
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </section>
      <section onClick={() => setIsSideNavOpen(false)}></section>
    </motion.div>
  );
};

export default SideNav;
