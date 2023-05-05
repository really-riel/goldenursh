import { useStoreState } from "easy-peasy";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import useGetDocuments from "../hooks/useGetDocuments";
import { doc } from "firebase/firestore";

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

  return user ? children : <Navigate to={"/auth/login"} />;
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
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">&larr; Back To Home</Link>
      </div>
    </main>
  );
};
