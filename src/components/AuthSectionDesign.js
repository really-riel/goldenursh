import React from "react";
import authImg from "../assets/authImage.png";

const AuthSectionDesign = () => {
  return (
    <section className="authSectionDesign">
      <div className="cover">
        <figure>
          <img src={authImg} alt="loginImg" />
        </figure>
        <div className="heading">
          <h1>Goldenursh</h1>
          <p>
            Your one - stop <br /> restaurant <br /> {"(Online and On - site)"}
          </p>
        </div>
        <div className="underline"></div>
      </div>
    </section>
  );
};

export default AuthSectionDesign;
