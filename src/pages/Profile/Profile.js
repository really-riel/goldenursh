import React from "react";
import { user } from "../../utils/data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <main className="Profile">
      <section className="profileDetails">
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="container"
        >
          <div className="imageContainer">
            <h2 className="mobileHeading">Profile Details</h2>
            <img src={user.image} alt="profile pic" />
          </div>
          <div className="formContainer">
            <form>
              <label htmlFor="profileName">Name</label>
              <input type="text" id="profileName" value={user.name} readOnly />

              <label htmlFor="profileFirstName">E-mail</label>
              <input
                type="email"
                id="profileFirstName"
                value={user.email}
                readOnly
              />

              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" value={user.phone} readOnly />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                readOnly
                value={user.address.length > 0 ? user.address : "ADD ADDRESS"}
              />
            </form>
            <Link to={"/profile/edit"}>
              <p role="button" className="editBtn">
                Edit Profile
              </p>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Profile;
