import React from "react";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import contactImg from "../assets/connectImg2.png";

const LaptopContactPage = () => {
  return (
    <section className="laptopContactPage ">
      <div className="container1">
        <div className="gridContainer">
          <div className="grid1">
            <h2>Connect With Us</h2>
            <p>Via our social media </p>
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
              You can also send us a message <br /> here.
            </p>

            <button className="messageBtn">Message</button>
          </div>
          <div className="grid2">
            <p>
              Welcome,
              <br /> This is Goldenursh <br /> support line
            </p>
            <figure>
              <img src={contactImg} alt="contactImg" />
            </figure>
          </div>
        </div>
      </div>
      <div className="container2"></div>
    </section>
  );
};

export default LaptopContactPage;
