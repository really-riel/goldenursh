import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import useGetCollection from "../../hooks/useGetCollection";

const Notification = () => {
  const { docItems, isLoading } = useGetCollection("userChat");
  const [totalPendingMsgs, setTotalPendingMsgs] = useState(0);

  useEffect(() => {
    if (docItems) {
      const pendingMessages = docItems?.filter(
        (item) => item.status === "pending"
      );
      setTotalPendingMsgs(pendingMessages?.length);
    }
  }, [docItems]);
  return (
    <main className="Notification">
      <div className="mainWrapper">
        <section>
          <h1>Notification</h1>

          <form action="" className="searchForm">
            <input type="text" placeholder="search" role="searchbox" />
            <BiSearch />
          </form>
        </section>
        <section>
          <div>
            <h2 className="all">All Notifications</h2>
          </div>
          <Link to={"/admin/messages"}>
            {totalPendingMsgs.length > 1 && (
              <p>You have {totalPendingMsgs} pending messages </p>
            )}
          </Link>
          <Link to={"/admin/orders"}>
            <p>Sola placed an order</p>
          </Link>
          <div className="btnContainer">
            <button className="clearBtn">Clear All</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Notification;
