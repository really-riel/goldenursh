import React from "react";
import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/Logo";
import SideNav from "../nav/SideNav";
import TabletNav from "../nav/TabletNav";
import { Link } from "react-router-dom";
import AdminSideNav from "../nav/AdminSideNav";

const AdminHeader = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { width } = useWindowSize();
  return (
    <header className="adminHeader">
      <motion.div className="hamburgerMenu" whileTap={{ scale: 0.8 }}>
        <GiHamburgerMenu
          size={width >= 768 ? "2.5rem" : "1.5rem"}
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        />
      </motion.div>
      <div className="logoContainer">
        {width < 1024 && <TabletNav />}
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      {isSideNavOpen && <AdminSideNav setIsSideNavOpen={setIsSideNavOpen} />}
    </header>
  );
};

export default AdminHeader;
