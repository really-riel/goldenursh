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
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { setUsersInDatabase } from "../../utils/firebaseFunctions";
import Loader from "../../components/Loader";

const Login = () => {
  const [isPasswordvisible, setIsPasswordVisble] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAdmin } = useStoreActions((actions) => actions.auth);

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setUser({
          id: response.user.uid,
          name: data.name,
          email: data.email,
          phone: data.phone,
          image: data.image,
          address: data.address,
          rememberMe: isRememberMe,
        });
      }

      const document = await getDoc(doc(db, "admin", response.user.uid));
      if (document.exists()) setIsAdmin(true);

      setIsLoading(false);
      state ? navigate(state) : navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.code.split("/")[1].replaceAll("-", " "));
    }
  };

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);

      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (!docSnap.exists()) {
        await setUsersInDatabase(response.user);
        setUser({
          id: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
          phone: response.user.phoneNumber,
          image: response.user.photoURL,
          address: null,
        });
      } else {
        setUser({
          id: response.user.uid,
          name: data.name,
          email: data.email,
          phone: data.phone,
          image: data.image,
          address: data.address,
        });
      }

      const document = await getDoc(doc(db, "admin", response.user.uid));
      if (document.exists()) setIsAdmin(true);

      setIsLoading(false);
      state ? navigate(state) : navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      /*  toast.error(error.code.split("/")[1].replaceAll("-", " ")); */
    }
  };

  return (
    <main className="Login">
      {isLoading && <Loader />}
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
