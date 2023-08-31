import React, { useState } from "react";
import AuthSectionDesign from "../../components/AuthSectionDesign";
import { MdCloudUpload, MdDelete } from "react-icons/md";

import SmallLogo from "../../components/SmallLogo";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../utils/firebase";
import {
  getChatAdminDetails,
  setUsersInDatabase,
  updateAdminLastLogin,
} from "../../utils/firebaseFunctions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { useStoreActions } from "easy-peasy";
import Loader from "../../components/Loader";
import { AiOutlineGoogle } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { state } = useLocation();

  const {
    auth: { setUser, setIsAdmin, setAdminRole },
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

  const checkIfUserIsAnAdmin = async (id) => {
    const document = await getDoc(doc(db, "admin", id));

    if (document.exists()) {
      setIsAdmin(true);
      setAdminRole(document.data().role);
      await updateAdminLastLogin(id);
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

      await checkIfUserIsAnAdmin(response.user.uid);
      await getChatAdminDetails(setChatAdminDetails);

      setIsLoading(false);
      state ? navigate(state) : navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("an error occured, try again later 🙇‍♂️");
    }
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
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="profile image"
                      />
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
            <div className="or">
              <div className="leftLine"></div>
              <p>or</p>
              <div className="rightLine"></div>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="signInWithGoogle"
              onClick={handleSignInWithGoogle}
            >
              Sign Up With Google <AiOutlineGoogle />
            </motion.button>
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
