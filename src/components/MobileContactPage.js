import React from "react";
import contactImg from "../assets/connectImg2.png";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MobileContactPage = () => {
  const navigate = useNavigate();

  return (
    <section className="mobileContactPage">
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="contactWrapper"
      >
        <p>
          Welcome, <br /> This is Goldenursh <br /> support line
        </p>
        <figure>
          <img src={contactImg} alt="contactImage" />
        </figure>
        <div className="contactWrapper2">
          <p>
            Connect with us <br /> <span>via our socil media plaforms</span>
          </p>
          <div className="socials">
            <button className="social">
              <BsInstagram />
            </button>
            <button className="social">
              <BsTwitter />
            </button>
            <button className="social">
              <FaFacebookF />
            </button>
            <button className="social">
              <BsWhatsapp />
            </button>
          </div>
          <p>
            You can also send us
            <br /> a message here.
          </p>
        </div>
      </motion.div>
      <button className="messageBtn" onClick={() => navigate("/contact/chat")}>
        Message
      </button>
    </section>
  );
};

export default MobileContactPage;
