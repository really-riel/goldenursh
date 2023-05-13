import React, { useState } from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import { MdCloudUpload, MdDelete } from "react-icons/md";

import SmallLogo from "../../components/SmallLogo";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, storage } from "../../utils/firebase";
import {
  getChatAdminDetails,
  setUsersInDatabase,
} from "../../utils/firebaseFunctions";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loading from "../../components/Loading";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const SignUp = () => {
  const [rawName, setRawName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const {
    auth: { setUser },
    chat: { setChatAdminDetails },
  } = useStoreActions((actions) => actions);

  const navigate = useNavigate();

  const handleNameFormatting = (e) => {
    const word = e.target.value;
    const words = word.split(" ");
    const capitalisedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const otherLetters = word.slice(1).toLowerCase();
      return `${firstLetter}${otherLetters}`;
    });
    setName(capitalisedWords.join(" "));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }
    if (name.split(" ").length < 2) {
      toast.error("Enter both First Name and LastName");
      setIsLoading(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (imageFile) {
        await handleImageUpload(response.user);
      } else {
        await setUsersInDatabase(response.user, name);
        setUser({
          id: response.user.uid,
          name,
          email,
          phone: response.user.phoneNumber,
          address: "",
          image: "",
        });
      }

      await getChatAdminDetails(setChatAdminDetails);
      setIsLoading(false);
      navigate("/");
      toast.success("account created");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.code.split("/")[1].replaceAll("-", " "));
    }
  };

  const handleImageUpload = async (user) => {
    const storageRef = ref(storage, `profileImages/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error(error);
        toast.error("Error while uploading : Try Again 🙇‍♂️");
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await setUsersInDatabase(user, name, imageUrl);
        setUser({
          id: user.uid,
          name,
          email,
          phone: user.phoneNumber,
          address: "",
          image: imageUrl,
        });
      }
    );
  };

  const handleDeleteImage = async () => {
    setImageFile(null);
  };

  return (
    <main className="Login SignUp">
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
            <form onSubmit={handleSignUp}>
              <div className="uploadImage">
                {imageFile ? (
                  <>
                    <figure>
                      <img src={URL.createObjectURL(imageFile)} alt="image" />
                    </figure>
                    <button
                      className="deleteImage"
                      onClick={handleDeleteImage}
                      type="button"
                    >
                      <MdDelete />
                    </button>
                  </>
                ) : (
                  <div className="labelContainer">
                    <label htmlFor="image" className="image">
                      <MdCloudUpload />
                      upload Profile Picture
                    </label>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                id="image"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                placeholder="First name   Last name"
                value={name}
                onChange={handleNameFormatting}
                required
              />

              <label htmlFor="signUpEmail">E-mail Address</label>

              <input
                type="email"
                id="signUpEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="signUpPassword">password</label>

              <input
                id="signUpPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <motion.button
                whileTap={{ scale: 0.8 }}
                className="signIn"
                type="submit"
                disabled={isImageLoading}
              >
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
