import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import TabletNav from "./TabletNav";
import { Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useStoreActions, useStoreState } from "easy-peasy";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { RequireAdminLink } from "../../components/RequireLinks";
import OptionsPopUp from "../../components/OptionsPopUp";

const DesktopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useStoreState((state) => state.auth);
  const { setIsAdmin, deleteUser, setAdminRole } = useStoreActions(
    (actions) => actions.auth
  );

  const [isLogoutOptOpen, setIsLogOutOptOpen] = useState(false);

  const { pathname } = useLocation();

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

  const scrollToHome = (sectionId) => {
    const homeSection = document.getElementById(sectionId);
    /*  if (pathname !== "/") {
      return <Navigate to={pathname} />;
    }
    homeSection.scrollIntoView({ behavior: "smooth" }); */
    return pathname !== "/" ? (
      <Navigate to="/" replace={true} />
    ) : (
      homeSection.scrollIntoView({ behavior: "smooth" })
    );
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

          {pathname === "/" && (
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
                    <li
                      onClick={(e) => {
                        setIsOpen(false) && console.log("ok");
                        scrollToHome("trendingOrders");
                      }}
                    >
                      Trending List
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(false);
                        scrollToHome("yourChoice");
                      }}
                    >
                      Order based on your choice
                    </li>
                  </ul>
                </div>
              )}
            </motion.li>
          )}

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
