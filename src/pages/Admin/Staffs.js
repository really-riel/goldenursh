import React, { useState } from "react";
import useGetCollection from "../../hooks/useGetCollection";
import Loader from "../../components/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { useStoreState } from "easy-peasy";
import { MdAddCircleOutline } from "react-icons/md";
import addNewStaffIcon from "../../assets/addNewStaff.png";
import { useRef } from "react";
import { useEffect } from "react";
import {
  GetStaffId,
  getStaffId,
  useGetStaffId,
} from "../../utils/firebaseFunctions";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toast } from "react-toastify";
import { BiWifiOff } from "react-icons/bi";

const Staffs = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isHandlingAFunction, setIsHandlingAFunction] = useState(false);

  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("");
  /*  const [newStaffId, setNewStaffId] = useState("");
  const [newStaffImage, setNewStaffImage] = useState(""); */

  const { isLoading, docItems } = useGetCollection("admin");

  const { user, adminRole } = useStoreState((state) => state.auth);

  const divRef = useRef(null);

  useEffect(() => {
    // add event listener to container div
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // check if clicked element is outside the div
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsDisplayed(false);
    }
  };

  const timestampConverter = (timestamp) => {
    if (!timestamp) return;
    const date = timestamp.toDate(); // convert Firebase ServerTimestamp to a Date object
    const formattedDate = date.toLocaleString("en-US", {
      month: "short", // abbreviated month name (e.g. "May")
      day: "numeric", // day of the month (e.g. "15")
      year: "numeric", // full year (e.g. "2020")
      hour: "numeric", // hour (e.g. "8")
      minute: "2-digit", // minute with leading zero (e.g. "00")
      hour12: true, // use 12-hour format (e.g. "am/pm")
    });

    return formattedDate;
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();

    setIsHandlingAFunction(true);
    try {
      const { newStaffId, newStaffImage, errorMsg } = await getStaffId(
        newStaffEmail
      );
      if (errorMsg) {
        toast.info(errorMsg);
        throw Error(errorMsg);
      }
      await setDoc(doc(db, "admin", newStaffId), {
        id: Date.now(),
        name: newStaffName,
        email: newStaffEmail,
        image: newStaffImage,
        role: newStaffRole,
        lastLogin: null,
      });
      setIsHandlingAFunction(false);

      setNewStaffEmail("");
      setNewStaffName("");
      setNewStaffRole("");
      setIsDisplayed(false);
      toast.success("staff added successfully 😊");
    } catch (error) {
      console.error(error);
      setIsHandlingAFunction(false);
      toast.error("error occurred while adding staff, Try again 🙇‍♂️");
    }
  };

  const handleDeleteStaff = async (email) => {
    setIsHandlingAFunction(true);

    try {
      const { newStaffId } = await getStaffId(email);
      await deleteDoc(doc(db, "admin", newStaffId));

      setIsHandlingAFunction(false);
      toast.success("staff succeffully removed 😊");
    } catch (error) {
      console.error(error);
      setIsHandlingAFunction(false);
      toast.error("error occurred while removing Staff 🙇‍♂️");
    }
  };

  return (
    <main className="Staffs">
      {isLoading && <Loader />}
      {docItems?.length > 0 ? (
        <div className="staffsContainer">
          {isHandlingAFunction && <Loader />}
          <h2>Staff Lists</h2>
          {adminRole.toLowerCase() === "admin" && (
            <p>
              Add or remove From existing <br />
              Staff List
            </p>
          )}

          <section className="staffsList">
            {docItems?.map((item, index) => (
              <div
                className={
                  user.email === item.email
                    ? `staffCard activeUser `
                    : "staffCard"
                }
                key={index}
              >
                <div className="staffMain">
                  <figure>
                    <img src={item.image} alt="" />
                  </figure>
                  <div className="nameContainer">
                    <p>{item.name}</p>
                  </div>
                </div>
                <div
                  className="staffMainDetails"
                  style={
                    adminRole.toLowerCase() === "admin"
                      ? { gridTemplateColumns: " repeat(4, 1fr)" }
                      : { gridTemplateColumns: " repeat(3, 1fr)" }
                  }
                >
                  <div className="emailContainer staffCardSections">
                    <p>Email</p>
                    <p className="bold">{item.email}</p>
                  </div>
                  <div className="roleContainer staffCardSections">
                    <p>Role</p>
                    <p className="bold">{item.role}</p>
                  </div>
                  <div
                    className="lastLoginContainer staffCardSections"
                    style={
                      adminRole === "Admin" ? null : { borderRight: " none" }
                    }
                  >
                    <p>last login</p>
                    <p className="bold">{timestampConverter(item.lastLogin)}</p>
                  </div>

                  {adminRole.toLowerCase() === "admin" && (
                    <div className="actionContainer staffCardSections">
                      <p>Action</p>
                      <button
                        className="deleteContainer"
                        disabled={user.email === item.email ? true : false}
                        onClick={() => handleDeleteStaff(item.email)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          {isDisplayed && (
            <section className="addNewStaff">
              <div className="addNewStaffContainer" ref={divRef}>
                <div className="headerContainer">
                  <div className="header">
                    <figure>
                      <img src={addNewStaffIcon} alt="" />
                    </figure>
                    <div className="heading">
                      <p>ADD NEW STAFF</p>
                    </div>
                  </div>
                </div>
                <div className="formContainer">
                  <form onSubmit={handleAddStaff}>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Last name First name"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      required
                    />
                    <label htmlFor="email">E-mail:</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={newStaffEmail}
                      onChange={(e) => setNewStaffEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="role">Role:</label>
                    <input
                      type="text"
                      id="role"
                      placeholder="Role"
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value)}
                      required
                    />
                    <button>Add Staff</button>
                  </form>
                </div>
              </div>
            </section>
          )}
          {adminRole.toLowerCase() === "admin" && (
            <button
              className="addNewButton"
              onClick={() => setIsDisplayed(!isDisplayed)}
            >
              Add new <MdAddCircleOutline />
            </button>
          )}
        </div>
      ) : docItems?.length === 0 ? (
        <section className="errorMsg">
          <p>No Staff list available</p>
          <p>
            Check Internet Connection <BiWifiOff />
          </p>
        </section>
      ) : null}
    </main>
  );
};

export default Staffs;
