import { useStoreState } from "easy-peasy";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import useGetDocuments from "../hooks/useGetDocuments";
import { doc } from "firebase/firestore";
import { useEffect } from "react";

export const ShowOnLogin = ({ children }) => {
  const { user } = useStoreState((state) => state.auth);

  return user ? children : null;
};

export const ShowOnLogout = ({ children }) => {
  const { user } = useStoreState((state) => state.auth);
  return user ? null : children;
};

export const RequireAuth = ({ children }) => {
  const { user } = useStoreState((state) => state.auth);
  const navigate = useNavigate();
  console.log(children.type.name);
  let targetUrl;
  switch (children.type.name) {
    case "CustomerOrders":
      targetUrl = "/orders";
      break;
    case "ProfileEdit":
      targetUrl = "/profile/edit";
      break;
    case "Chat":
      targetUrl = "/contact/chat";
      break;
    case "Checkout":
      targetUrl = "/cart";
      break;
    default:
      targetUrl = `/${children.type.name.toLowerCase()}`;
  }
  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { state: targetUrl });
    }
  }, [user, navigate, targetUrl]);
  return user ? children : null;
};

export const RequireAuthAndNonAdminRole = ({ children }) => {
  const { user } = useStoreState((state) => state.auth);
  const { adminRole } = useStoreState((state) => state.auth);

  return user && adminRole !== "admin" ? (
    children
  ) : !user ? (
    <Navigate to={"/auth/login"} state={"/contact/chat"} />
  ) : adminRole === "admin" ? (
    <main className="notAdmin">
      <div className="container">
        <h1>Permission Denied.</h1>
        <p>This page can not be viewed by an Admin role user.</p>
        <br />
        <Link to="/">&larr; Back To Home</Link>
      </div>
    </main>
  ) : null;
};

export const RequireAdminLink = ({ children }) => {
  const { isAdmin } = useStoreState((state) => state.auth);

  return isAdmin ? children : null;
};

export const RequireAdminRoute = ({ children }) => {
  const { isAdmin } = useStoreState((state) => state.auth);

  return isAdmin ? (
    children
  ) : (
    <main className="notAdmin">
      <div className="container">
        <h1>Permission Denied.</h1>
        <p>This page can only be viewed by an Admin user.</p>
        <br />
        <Link to="/">&larr; Back To Home</Link>
      </div>
    </main>
  );
};

export const RequireAdminRoleToBeAdmin = ({ children }) => {
  const { adminRole, isAdmin } = useStoreState((state) => state.auth);

  return adminRole === "admin" && isAdmin ? (
    children
  ) : (
    <main className="notAdmin">
      <div className="container">
        <h1>Permission Denied.</h1>
        <p>This page can only be viewed by an Admin user.</p>
        <br />
        <Link to="/">&larr; Back To Home</Link>
      </div>
    </main>
  );
};

export const HideForNoneAdminRole = ({ children }) => {
  const { adminRole } = useStoreState((state) => state.auth);

  return adminRole === "admin" ? children : null;
};
