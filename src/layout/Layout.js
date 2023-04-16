import React from "react";
import Header from "./header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import useGetDocuments from "../hooks/useGetDocuments";
import { useEffect } from "react";

const Layout = () => {
  const { setUser } = useStoreActions((actions) => actions.auth);
  const { user } = useStoreState((state) => state.auth);

  /*   useEffect(() => {
    setUser(doc);
  }, [doc]);
 */
  return (
    <>
      <ToastContainer position="top-left" className={"toastMessage"} />
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration
          getKey={(location, matches) => {
            const paths = ["/"];

            return paths.includes(location.pathname)
              ? location.pathname
              : location.key;
          }}
        />
      </div>
    </>
  );
};

export default Layout;
