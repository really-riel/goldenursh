import React, { useState } from "react";
import { user } from "../../utils/data";
import { AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion";

const ProfileEdit = () => {
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editImage, setEditImage] = useState(user.image);
  const [editAddress, setEditAddress] = useState(user.address);
  return (
    <main className="Profile ProfileEdit">
      <section className="profileDetails">
        <div className="tabletSection1">
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="container"
          >
            <div className="imageContainer">
              <h2 className="mobileHeading">Edit Profile</h2>
              <label htmlFor="editImage">
                <figure>
                  <img src={editImage} alt="profile pic" />
                  <div className="editPhoto">
                    Edit Photo
                    <AiOutlineEdit />
                  </div>
                </figure>
              </label>
            </div>
            <div className="formContainer">
              <form>
                <input
                  type="file"
                  accept="image/*"
                  id="editImage"
                  className="hidden"
                />
                <label htmlFor="profileName">Name</label>
                <input
                  type="text"
                  id="profileName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <label htmlFor="profileFirstName">E-mail</label>
                <input
                  type="email"
                  id="profileFirstName"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />

                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />

                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
                <button>Complete</button>
              </form>
            </div>
          </motion.div>
        </div>
        <div className="tabletSection2 shapedividers_com-1822"></div>
      </section>
    </main>
  );
};

export default ProfileEdit;
