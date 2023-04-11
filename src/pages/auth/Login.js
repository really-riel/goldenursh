import React, { useState } from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";

import SmallLogo from "../../components/SmallLogo";

const Login = () => {
  const [isPasswordvisible, setIsPasswordVisble] = useState(false);
  return (
    <main className="Login">
      <AuthSectionDesign />

      <section>
        <p className="tabletLogin">
          Hello, Welcome back. <br /> Good to have you
        </p>
        <div className="formContainer">
          <SmallLogo />
          <p className="mobileLogin">
            Hello, Welcome back. <br /> Good to have you
          </p>
          <form>
            <label htmlFor="email">E-mail Address</label>
            <input type="email" id="email" autoFocus required />
            <label htmlFor="password">password</label>
            <div className="passwordWrapper">
              <input
                type={isPasswordvisible ? "text" : "password"}
                id="password"
              />

              <div
                className="passwordVisiblityBtn"
                onMouseDown={() => setIsPasswordVisble(true)}
                onMouseUp={() => setIsPasswordVisble(false)}
                onTouchStart={() => setIsPasswordVisble(true)}
                onTouchEnd={() => setIsPasswordVisble(false)}
                onTouchCancel={() => setIsPasswordVisble(false)}
              >
                {isPasswordvisible ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
            </div>
            <button className="signIn">Sign In</button>
            <div className="or">
              <div className="leftLine"></div>
              <p>or</p>
              <div className="rightLine"></div>
            </div>
          </form>
          <button className="signInWithGoogle">
            Sign In With Google <AiOutlineGoogle />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
