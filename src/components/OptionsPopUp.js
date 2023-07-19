import React, { useEffect, useRef } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const OptionsPopUp = ({
  setIsLogOutOptOpen,
  type,
  handleLogout,
  handleDeleteStaff,
  deleteStaff,
}) => {
  console.log(deleteStaff);
  console.log("ok");
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
      setIsLogOutOptOpen(false);
    }
  };

  return (
    <div className="OptionsPopUp">
      <div className="optContainer" ref={divRef}>
        {type === "staffs" ? (
          <div className="deleteStaffContainer">
            <div className="deleteStaffInfo">
              <p>
                <span className="red"> Remove </span>
                {deleteStaff.name}
              </p>
              <img src={deleteStaff.image} alt="" />
            </div>
            <div className="warningNote">
              <div className="">
                <HiOutlineExclamationCircle className="icon" />
              </div>
              <p>
                This action will remove the Staff's access and permissions to
                the Admin section of this site.
              </p>
            </div>
            <p className="bold">Confirm removal?</p>
          </div>
        ) : (
          <p className="bold">
            You are about to log out.🙇‍♂️
            <br /> <br /> Continue?
          </p>
        )}

        <div className="btnContainer">
          <button
            className="yesBtn"
            onClick={() => {
              setIsLogOutOptOpen(false);
              type === "staffs"
                ? handleDeleteStaff(deleteStaff.email)
                : handleLogout();
            }}
          >
            Yes
          </button>
          <button className="noBtn" onClick={() => setIsLogOutOptOpen(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsPopUp;
