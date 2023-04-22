import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo";
import { SlHome } from "react-icons/sl";
import { BiBell, BiDish } from "react-icons/bi";
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
import { ShowOnLogin, ShowOnLogout } from "../../components/RequireLinks";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useStoreActions, useStoreState } from "easy-peasy";

const AdminSideNav = ({ setIsSideNavOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUser, setIsAdmin } = useStoreActions((actions) => actions.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsSideNavOpen(false);
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
          <h2>MENU</h2>
          <ul>
            <NavLink
              to={"/admin/dashboard"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <BsGrid1X2Fill /> Dashboard
              </li>
            </NavLink>

            <NavLink
              to={"/admin/staffs"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <FaUsers /> Staffs
              </li>
            </NavLink>
            <NavLink
              className="cart"
              to={"/admin/orders"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <FiShoppingBag /> Orders
              </li>
            </NavLink>
            <NavLink
              className="profile"
              to={"/admin/dishes"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <BiDish />
                Dishes
              </li>
            </NavLink>
            <NavLink
              className="orders"
              to={"/admin/inventory"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <MdOutlineInventory2 /> Inventory
              </li>
            </NavLink>
            <NavLink
              className="orders"
              to={"/admin/message"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <HiOutlineMail /> Message
              </li>
            </NavLink>
            <NavLink
              className="orders"
              to={"/admin/notification"}
              onClick={() => setIsSideNavOpen(false)}
            >
              <li>
                <BiBell />
                Notification
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
              <li onClick={handleLogout}>
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

export default AdminSideNav;
