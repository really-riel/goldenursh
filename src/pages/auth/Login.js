import React, { useState } from "react";
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

const Login = () => {
  const [isPasswordvisible, setIsPasswordVisble] = useState(false);
  const [istoggled, setIsToggled] = useState(false);

  return (
    <main className="Login">
      <AuthSectionDesign />

      <section className="loginSection2">
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section2Wrapper"
        >
          <p className="tabletLogin">
            Hello, Welcome back. <br /> Good to have you
          </p>
          <div className="formContainer">
            <SmallLogo />
            <p className="mobileLogin">
              Hello, Welcome back. <br /> Good to have you
            </p>
            <form>
              <label htmlFor="loginEmail">E-mail Address</label>
              <input type="email" id="loginEmail" required />
              <label htmlFor="password">password</label>
              <div className="passwordWrapper">
                <input
                  type={isPasswordvisible ? "text" : "password"}
                  id="password"
                  required
                />

                <div
                  className="passwordVisibilityBtn"
                  onMouseDown={() => setIsPasswordVisble(true)}
                  onMouseUp={() => setIsPasswordVisble(false)}
                  onTouchStart={() => setIsPasswordVisble(true)}
                  onTouchEnd={() =>
                    setTimeout(() => {
                      setIsPasswordVisble(false);
                    }, 3000)
                  }
                  onTouchCancel={() =>
                    setTimeout(() => {
                      setIsPasswordVisble(false);
                    }, 3000)
                  }
                >
                  {isPasswordvisible ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
              </div>
              <div className="suggestions">
                <Link to={"/auth/reset-password"}>
                  <motion.p
                    whileTap={{ scale: 0.8 }}
                    className="forgotPassword"
                  >
                    Forgot Password?
                  </motion.p>
                </Link>
                <div className="rememberMe">
                  <p>Remember me</p>
                  <Switch
                    uncheckedIcon={false}
                    checkedIcon={false}
                    checked={istoggled}
                    onColor="#084104"
                    className="switch"
                    onChange={() => setIsToggled(!istoggled)}
                    width={30}
                    height={15}
                    /* #084104  #9acd32*/
                  />
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.8 }} className="signIn">
                Sign In
              </motion.button>
              <div className="or">
                <div className="leftLine"></div>
                <p>or</p>
                <div className="rightLine"></div>
              </div>
            </form>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="signInWithGoogle"
            >
              Sign In With Google <AiOutlineGoogle />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Login;
