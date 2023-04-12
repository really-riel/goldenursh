import React from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import { MdCloudUpload } from "react-icons/md";

import SmallLogo from "../../components/SmallLogo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <main className="Login SignUp">
      <AuthSectionDesign />

      <section className="loginSection2">
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section2Wrapper"
        >
          <p className="tabletLogin">
            Hello, Glad to have you. <br /> You can Sign-up for an account
            below.
          </p>
          <div className="formContainer">
            <SmallLogo />
            <p className="mobileLogin">
              Hello, Glad to have you. <br /> You can Sign-up for an account
              <br />
              below.
            </p>
            <form>
              <div className="uploadImage">
                <label htmlFor="image" className="image">
                  <MdCloudUpload />
                  upload Profile Picture
                </label>
              </div>
              <input
                type="file"
                className="hidden"
                id="image"
                accept="image/*"
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="First name   Last name"
              />

              <label htmlFor="signUpEmail">E-mail Address</label>
              <input type="email" id="signUpEmail" required />
              <label htmlFor="signUpPassword">password</label>

              <input type="signUpPassword" required />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="text" id="confirmPassword" />

              <motion.button whileTap={{ scale: 0.8 }} className="signIn">
                Sign Up
              </motion.button>
            </form>
            <p className="suggestion">
              Have an account already? Sign-in
              <Link to={"/auth/login"}>
                <motion.span whileTap={{ scale: 0.8 }}> here</motion.span>
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default SignUp;
