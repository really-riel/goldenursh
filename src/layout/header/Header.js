import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/Logo";
import SideNav from "../nav/SideNav";

const Header = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    <header>
      <GiHamburgerMenu
        size={"1.5rem"}
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      />
      <Logo />

      {isSideNavOpen && <SideNav setIsSideNavOpen={setIsSideNavOpen} />}
    </header>
  );
};

export default Header;
