import { useStoreState } from "easy-peasy";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import React from "react";

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