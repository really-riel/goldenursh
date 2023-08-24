import React from "react";
import { BiSearch } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";

const Notification = () => {
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
            <p>You have 5 pending messages </p>
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
