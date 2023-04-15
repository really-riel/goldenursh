import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profileImg from "../../assets/userProfile.png";
import { useStoreState } from "easy-peasy";
import avatar from "../../assets/userProfile.png";

const Profile = () => {
  const { user } = useStoreState((state) => state.auth);
  return (
    <main className="Profile">
      <section className="profileDetails">
        <div className="tabletSection1 ">
          <div className="tabletHeading">
            <h2>Profile Details</h2>
            <Link to={"/profile/edit"}>
              <h2 role="button" className="tabletEditBtn">
                Edit
              </h2>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="container"
          >
            <div className="imageContainer">
              <h2 className="mobileHeading">Profile Details</h2>
              <img src={user.image ? user.image : avatar} alt="profile pic" />
            </div>
            <div className="formContainer">
              <form>
                <label htmlFor="profileName">Name</label>
                <input
                  type="text"
                  id="profileName"
                  value={user.name}
                  readOnly
                />

                <label htmlFor="profileFirstName">E-mail</label>
                <input
                  type="email"
                  id="profileFirstName"
                  value={user.email}
                  readOnly
                />

                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={user.phone ? user.phone : "ADD PHONE NUMBER"}
                  readOnly
                />

                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  readOnly
                  value={user.address ? user.address : "ADD ADDRESS"}
                />
              </form>
              <Link to={"/profile/edit"}>
                <p role="button" className="editBtn">
                  Edit Profile
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="tabletSection2 shapedividers_com-1822"></div>
      </section>
    </main>
  );
};

export default Profile;
