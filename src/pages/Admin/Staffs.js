import React from "react";
import useGetCollection from "../../hooks/useGetCollection";
import Loader from "../../components/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";

const Staffs = () => {
  const { isLoading, docItems } = useGetCollection("admin");
  console.log(docItems);

  const handleAddStaff = async () => {
    //do
  };

  return (
    <main className="Staffs">
      <div className="staffsContainer">
        {isLoading && <Loader />}
        <h2>Staff Lists</h2>
        <p>
          Add or remove From existing <br />
          Staff List
        </p>
        <section>
          {docItems?.map((item, index) => (
            <div className="" key={index}>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
              </div>
              <div>
                <p>{item.email}</p>
              </div>
              <div>
                <p>last login</p>
                <p>{item.lastLogin}</p>
              </div>
              <div>
                <p>Action</p>
                <div className="">
                  <FaTrashAlt />
                </div>
              </div>
            </div>
          ))}
        </section>
        <button onClick={handleAddStaff}>
          Add new <GrAddCircle />
        </button>
      </div>
    </main>
  );
};

export default Staffs;
