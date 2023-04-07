import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/Logo";

const Header = () => {
  return (
    <header>
      <GiHamburgerMenu size={"1.5rem"} />
      <Logo />
    </header>
  );
};

export default Header;
