import React, { useState } from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import SmallLogo from "../../components/SmallLogo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "An email with instructions to reset your password has been sent. Check your email."
      );
    } catch (error) {
      console.error(error);
      toast.error("Error occurred: try again🙇‍♂️");
    }
  };

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
            <form onSubmit={handleResetPassword}>
              <label htmlFor="loginEmail">E-mail Address</label>
              <input
                type="email"
                id="loginEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <motion.button whileTap={{ scale: 0.8 }} className="signIn">
                Reset Password
              </motion.button>
              <div className="options">
                <Link to={"/auth/login"}>
                  <motion.p whileTap={{ scale: 0.8 }} className="option">
                    Login
                  </motion.p>
                </Link>
                <Link to={"/auth/sign-up"} className="option">
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
