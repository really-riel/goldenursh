import React from "react";
import { useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const year = new Date().getFullYear();

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const socialIcons = [
    <BsInstagram />,
    <BsTwitter />,
    <FaFacebookF />,
    <BsWhatsapp />,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer>
      <div className="footerSections">
        <section>
          <p>Socials</p>
          <div className="socials">
            {socialIcons.map((icon, index) => (
              <button key={index}>{icon}</button>
            ))}
          </div>
        </section>
        <section className="formSection">
          <p>Subscribe to our newsletter for frequent trends update</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email:</label>
            <input type="email" id="email" placeholder="email" />
            <button>Subscribe</button>
          </form>
        </section>
        <section>
          <a role="button" onClick={handleGoToTop}>
            Back to Top <IoIosArrowDropup />
          </a>
        </section>
      </div>
      <p className="footing">Copyright {year} &copy; All rights Reserved. </p>
    </footer>
  );
};

export default Footer;
