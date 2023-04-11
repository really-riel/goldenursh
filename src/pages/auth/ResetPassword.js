import React from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";

import SmallLogo from "../../components/SmallLogo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Switch from "react-switch";

const ResetPassword = () => {
  return (
    <main className="Login ResetPassword">
      <AuthSectionDesign />

      <section className="loginSection2">
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section2Wrapper"
        >
          <p className="tabletLogin">Reset Password</p>
          <div className="formContainer">
            <SmallLogo />
            <p className="mobileLogin">Reset Password</p>
            <form>
              <label htmlFor="loginEmail">E-mail Address</label>
              <input type="email" id="loginEmail" required />

              <motion.button whileTap={{ scale: 0.8 }} className="signIn">
                Reset Password
              </motion.button>
              <div className="options">
                <Link to={"/auth/login"}>
                  <motion.p whileTap={{ scale: 0.8 }}>Login</motion.p>
                </Link>
                <Link to={"/auth/sign-up"}>
                  <motion.p whileTap={{ scale: 0.8 }}>Sign Up</motion.p>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ResetPassword;
