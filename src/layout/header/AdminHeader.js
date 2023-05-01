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
import { RequireAdminLink } from "../../components/RequireLinks";
import { HiOutlineMail } from "react-icons/hi";
import { useStoreState } from "easy-peasy";
import { BiBell } from "react-icons/bi";

const AdminHeader = () => {
  const { user } = useStoreState((state) => state.auth);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { width } = useWindowSize();

  return (
    <RequireAdminLink>
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
        <div className="laptopHeaderNav">
          <ul>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <li className="icon">
              <HiOutlineMail />
            </li>
            <li className="icon">
              <BiBell />
            </li>
            <li className="userDetails">
              <img src={user.image} alt="" />
              <p>
                {user.name} <br />
                <span>Admin</span>
              </p>
            </li>
          </ul>
        </div>

        {isSideNavOpen && <AdminSideNav setIsSideNavOpen={setIsSideNavOpen} />}
      </header>
    </RequireAdminLink>
  );
};

export default AdminHeader;
