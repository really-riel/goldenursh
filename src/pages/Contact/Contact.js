import React from "react";
import MobileContactPage from "../../components/MobileContactPage";
import LaptopContactPage from "../../components/LaptopContactPage";

const Contact = () => {
  return (
    <main className="Contact">
      <MobileContactPage />
      <LaptopContactPage />
    </main>
  );
};

export default Contact;
