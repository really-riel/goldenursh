import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/Logo";
import SideNav from "../nav/SideNav";
import useWindowSize from "../../hooks/useWindowSize";
import DesktopNav from "../nav/DesktopNav";
import TabletNav from "../nav/TabletNav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { width } = useWindowSize();
  return (
    <header>
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

      {isSideNavOpen && <SideNav setIsSideNavOpen={setIsSideNavOpen} />}
      <DesktopNav />
    </header>
  );
};

export default Header;
