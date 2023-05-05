import React from "react";
import useGetDocuments from "../../hooks/useGetDocuments";
import { useStoreState } from "easy-peasy";
import Loader from "../../components/Loader";
import noOrder from "../../assets/no-order.svg";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";

const CustomerOrders = () => {
  const { user } = useStoreState((state) => state.auth);
  const { document, isLoading, error } = useGetDocuments("orders", user.id);
  const variant = {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    },
  };

  return (
    <main className="CustomerOrders">
      {isLoading && <Loader />}

      {!isLoading && !document && (
        <motion.section
          variants={variant}
          initial="initial"
          animate="animate"
          className="noOrder"
        >
          <img src={noOrder} alt="" />
          <h2>
            Ooops, You Haven't placed an Order yet 🙇‍♂️ <br />
            <Link to={"/"}>
              <span>
                Start Shopping now <AiOutlineShoppingCart />
              </span>
            </Link>
          </h2>
        </motion.section>
      )}

      {!isLoading && document && (
        <>
          <h2>Orders</h2>
          <motion.section
            variants={variant}
            initial="initial"
            animate="animate"
            className="tableContainer"
          >
            <table>
              <tbody>
                {document.orderItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.mainMeal} <br /> {item.extra}
                    </td>
                    <td>x{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                    <td>{item?.address ? "ogunstate" : ""}</td>
                    <td>
                      {
                        new Date(
                          document.timeStamp.seconds * 1000 +
                            document.timeStamp.nanoseconds / 1000000
                        )
                          .toLocaleString()
                          .split(",")[0]
                      }
                      <br />
                      {
                        new Date(
                          document.timeStamp.seconds * 1000 +
                            document.timeStamp.nanoseconds / 1000000
                        )
                          .toLocaleString()
                          .split(",")[1]
                      }
                    </td>
                    <td>
                      <div
                        className={
                          document.orderStatus === "pending"
                            ? "pending"
                            : document.orderStatus === "delivered"
                            ? "delivered"
                            : document.orderStatus === "canceled"
                            ? "canceled"
                            : ""
                        }
                      >
                        {document.orderStatus}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.section>
        </>
      )}
    </main>
  );
};

export default CustomerOrders;
