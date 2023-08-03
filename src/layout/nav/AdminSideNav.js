import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo";
import { SlHome } from "react-icons/sl";
import { BiBell, BiDish } from "react-icons/bi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { FaTimes, FaUsers } from "react-icons/fa";

import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import {
  HideForNoneAdminRole,
  ShowOnLogin,
  ShowOnLogout,
} from "../../components/RequireLinks";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useStoreActions, useStoreState } from "easy-peasy";
import useWindowSize from "../../hooks/useWindowSize";
import OptionsPopUp from "../../components/OptionsPopUp";

const AdminSideNav = ({ setIsSideNavOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOptOpen, setIsLogOutOptOpen] = useState(false);
  const { deleteUser, setIsAdmin, setAdminRole } = useStoreActions(
    (actions) => actions.auth
  );
  const { width } = useWindowSize();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (width < 1200) setIsSideNavOpen(false);
      setAdminRole("");
      deleteUser();
      setIsAdmin(false);
      toast.success("logout Successful");
    } catch (error) {
      console.error(error);
      error.code === "auth/internal-error"
        ? toast.error("check your Network")
        : toast.error(error.code.split("/")[1]);
    }
  };

  const handleClick = () => {
    if (width >= 1200) return;
    setIsSideNavOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="sideNav adminSideNav"
      >
        <section>
          <div>
            <Logo />
            <FaTimes className="cancelButton" onClick={handleClick} />
          </div>
          <nav>
            <h2>MENU</h2>
            <ul>
              <NavLink to={"/admin/dashboard"} onClick={handleClick}>
                <li>
                  <BsGrid1X2Fill /> Dashboard
                </li>
              </NavLink>

              <NavLink to={"/admin/staffs"} onClick={handleClick}>
                <li>
                  <FaUsers /> Staffs
                </li>
              </NavLink>

              <NavLink to={"/admin/orders"} onClick={handleClick}>
                <li>
                  <RiShoppingBag3Line /> Orders
                </li>
              </NavLink>
              <NavLink
                className="cart"
                to={"/admin/orders"}
                onClick={handleClick}
              >
                <li>
                  <FiShoppingBag /> Orders
                </li>
              </NavLink>
              <NavLink className="" to={"/admin/dishes"} onClick={handleClick}>
                <li>
                  <BiDish />
                  Dishes
                </li>
              </NavLink>
              <NavLink
                className="orders"
                to={"/admin/inventory"}
                onClick={handleClick}
              >
                <li>
                  <MdOutlineInventory2 /> Inventory
                </li>
              </NavLink>
              <HideForNoneAdminRole>
                <NavLink
                  className="orders"
                  to={"/admin/messages"}
                  onClick={handleClick}
                >
                  <li>
                    <HiOutlineMail /> Messages
                  </li>
                </NavLink>
              </HideForNoneAdminRole>
              <NavLink
                className="orders"
                to={"/admin/notification"}
                onClick={handleClick}
              >
                <li>
                  <BiBell />
                  Notification
                </li>
              </NavLink>

              {/* login */}
              <ShowOnLogout>
                <NavLink to={"/auth/login"} onClick={handleClick}>
                  <li>
                    <HiOutlineArrowRightOnRectangle /> Login
                  </li>
                </NavLink>
              </ShowOnLogout>

              {/* logout */}
              <ShowOnLogin>
                <li
                  onClick={() => setIsLogOutOptOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <HiOutlineArrowLeftOnRectangle /> Logout
                </li>
              </ShowOnLogin>
            </ul>
          </nav>
        </section>
        <section onClick={handleClick}></section>
      </motion.div>

      {isLogoutOptOpen && (
        <OptionsPopUp
          handleLogout={handleLogout}
          setIsLogOutOptOpen={setIsLogOutOptOpen}
          type={"logout"}
        />
      )}
    </>
  );
};

export default AdminSideNav;
