import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <h1>Page not found</h1>
      <Link to={"/"}>
        <p>Go to Homepage</p>
      </Link>
    </main>
  );
};

export default Missing;
