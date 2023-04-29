import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import TabletNav from "./TabletNav";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useStoreActions, useStoreState } from "easy-peasy";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";

const DesktopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useStoreState((state) => state.auth);
  const { setIsAdmin, deleteUser } = useStoreActions((actions) => actions.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
        <NavLink to={"/contact"}>
          <motion.li whileTap={{ scale: 0.8 }}>Contact</motion.li>
        </NavLink>
        {user ? (
          <Link onClick={handleLogout}>Logout</Link>
        ) : (
          <NavLink to={"auth/login"}>
            <motion.li
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsOpen(false)}
            >
              Login
            </motion.li>
          </NavLink>
        )}

        <TabletNav />
      </ul>
    </nav>
  );
};

export default DesktopNav;
