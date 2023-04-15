import React, { useState } from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";

import SmallLogo from "../../components/SmallLogo";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useStoreActions, useStoreState } from "easy-peasy";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Login = () => {
  const [isPasswordvisible, setIsPasswordVisble] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsUserInDataBase } = useStoreActions(
    (actions) => actions.auth
  );
  const { isUserInDataBase } = useStoreState((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const setUsersInDatabase = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        image: user.photoURL,
        timeStamp: serverTimestamp(),
        address: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login Successful");
    } catch (error) {
      console.error(error);
      toast.error(error.code.split("/")[1].replaceAll("-", " "));
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      await setUsersInDatabase(response.user);
      setUser({
        id: response.user.uid,
        name: response.user.displayName,
        email: response.user.email,
        phone: response.user.phoneNumber,
        image: response.user.photoURL,
        timeStamp: serverTimestamp(),
        address: null,
      });
      state ? navigate(state) : navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.code.split("/")[1]);
    }
  };

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
            <form onSubmit={handleSignIn}>
              <label htmlFor="loginEmail">E-mail Address</label>
              <input
                type="email"
                id="loginEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">password</label>
              <div className="passwordWrapper">
                <input
                  type={isPasswordvisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    checked={isRememberMe}
                    onColor="#084104"
                    className="switch"
                    onChange={() => setIsRememberMe(!isRememberMe)}
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
              onClick={handleSignInWithGoogle}
            >
              Sign In With Google <AiOutlineGoogle />
            </motion.button>
            <p className="signUpOption">
              Dont have an account? Sign-Up
              <Link to={"/auth/sign-up"}>
                <motion.span whileTap={{ scale: 0.8 }}> here</motion.span>
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Login;
