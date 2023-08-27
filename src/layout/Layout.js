import React, { useRef } from "react";
import Header from "./header/Header";
import {
  HashRouter,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Footer from "./footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import useGetDocuments from "../hooks/useGetDocuments";
import { useEffect } from "react";
import AdminHeader from "./header/AdminHeader";
import AdminSideNav from "./nav/AdminSideNav";
import useWindowSize from "../hooks/useWindowSize";

const Layout = () => {
  const { setUser } = useStoreActions((actions) => actions.auth);
  const { user } = useStoreState((state) => state.auth);

  const { pathname } = useLocation();
  const { width } = useWindowSize();

  /*   useEffect(() => {
    setUser(doc);
  }, [doc]);
 */
  const location = useLocation();
  const lastHash = useRef("");

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 100);
    }
  }, [location]);
  return (
    <>
      <ToastContainer position="top-left" className={"toastMessage"} />
      <div className="App">
        {pathname.includes("/admin") ? (
          <>
            <div className="Admin">
              {width < 1200 ? (
                <>
                  <AdminHeader />
                  <Outlet />
                </>
              ) : (
                <>
                  <AdminSideNav />
                  <div className="adminMain">
                    <AdminHeader />
                    <Outlet />
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Header />
            <Outlet />
            {pathname !== "/contact/chat" && <Footer />}
          </>
        )}

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
