import React from "react";
import MobileContactPage from "../../components/MobileContactPage";
import TabletContactPage from "../../components/TabletContactPage";

const Contact = () => {
  return (
    <main className="Contact">
      <MobileContactPage />
      <TabletContactPage />
    </main>
  );
};

export default Contact;
