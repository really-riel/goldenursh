import React from "react";
import { useState } from "react";
import { FiWifiOff } from "react-icons/fi";

const ErrorBoundary = (props) => {
  const [hasError, setHasError] = useState(false);

  function handleCatch(error, errorInfo) {
    console.log(error, errorInfo);
    setHasError(true);
  }

  if (hasError) {
    // Fallback UI for when an error occurs
    return <h1>Something went wrong.</h1>;
  }

  return (
    <main className="ErrorBoundary">
      <h1>
        {" "}
        Check internet Connnection <FiWifiOff />
      </h1>
    </main>
  );
};

export default ErrorBoundary;
