import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import TabletNav from "./TabletNav";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useStoreActions, useStoreState } from "easy-peasy";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { RequireAdminLink } from "../../components/RequireLinks";
import { FaUserCog } from "react-icons/fa";
import OptionsPopUp from "../../components/OptionsPopUp";

const DesktopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useStoreState((state) => state.auth);
  const { setIsAdmin, deleteUser, setAdminRole } = useStoreActions(
    (actions) => actions.auth
  );

  const [isLogoutOptOpen, setIsLogOutOptOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      setAdminRole("");
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
    <>
      <nav className="desktopNav">
        <ul>
          <NavLink to={"/"} onClick={() => setIsOpen(false)}>
            <motion.li whileTap={{ scale: 0.8 }}>Home</motion.li>
          </NavLink>

          <RequireAdminLink>
            <NavLink to={"/admin/dashboard"}>
              <li>Admin</li>
            </NavLink>
          </RequireAdminLink>

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
                  <Link to={"/#trendingOrders"}>
                    <li onClick={(e) => setIsOpen(false) && console.log("ok")}>
                      Trending List
                    </li>
                  </Link>
                  <Link to={"/#yourChoice"}>
                    <li onClick={() => setIsOpen(false)}>
                      Order based on your choice
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </motion.li>
          <NavLink to={"/contact"}>
            <motion.li whileTap={{ scale: 0.8 }}>Contact</motion.li>
          </NavLink>
          <NavLink to={"/orders"}>
            <motion.li whileTap={{ scale: 0.8 }}>Orders</motion.li>
          </NavLink>
          {user ? (
            <Link onClick={() => setIsLogOutOptOpen(true)}>Logout</Link>
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

export default DesktopNav;
