import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { pushOrdersToDatabase } from "../../utils/firebaseFunctions";
import { useEffect } from "react";

const Checkout = () => {
  const {
    state: { user, subTotal, totalItems, cartItems },
  } = useLocation();

  console.log(cartItems);

  /*  useEffect(() => {
    const obj = cartItems.reduce((acc, item) => {
      acc = { ...item };
      return acc;
    }, {});
    console.log(obj);
  }, []); */

  const navigate = useNavigate();

  const config = {
    public_key: "FLWPUBK_TEST-e6adf87b276c2a924115a43fa9997f91-X",
    tx_ref: Date.now(),
    amount: subTotal + totalItems * 500,
    currency: "NGN",
    payment_options: "",
    payment_plan: "3341",
    customer: {
      email: user.email,
      phone_number: user.phone,
      name: user.name,
    },
    meta: { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
    customizations: {
      title: "Goldenursh",
      description: "Payment food ordered",
      logo: "https://images2.imgbox.com/25/dc/DC2UhiCP_o.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <main className="Checkout">
      <div className="contentWrapper">
        <section className="orderSummary">
          <h2>Order summary</h2>
          <ul>
            <li>
              <p>item's total ({totalItems}) </p>
              <p>
                <TbCurrencyNaira /> {subTotal}
              </p>
            </li>
            <li>
              <p>Delivery fees</p>
              <p>
                <TbCurrencyNaira /> {totalItems * 500}
              </p>
            </li>
            <li>
              <p>Total</p>
              <p>
                <TbCurrencyNaira /> {subTotal + totalItems * 500}
              </p>
            </li>
          </ul>
        </section>
        <section className="deliveryDetails">
          <div className="deliveryAddress">
            <h2>Delivery Address</h2>
            {user.address && user.phone ? (
              <div className="deliveryDetails">
                <p>{user.name}</p>
                <p>{user.address}</p>
              </div>
            ) : (
              <p
                className="addAddress"
                role="navigation"
                onClick={() =>
                  navigate("/profile/edit", {
                    state: "/cart/checkout",
                  })
                }
              >
                Add address and Phone number <FiEdit />
              </p>
            )}
          </div>
          {/*  <div className="paymentMethod">
            <h2>Payment Method</h2>
            <div className="methodWrapper">
              <label htmlFor="paymentMethod">Select Payment Method</label>
              <select name="" id="paymentMethod">
                <option value="card">card</option>
                <option value="mobilemoney">Mobile Money</option>
                <option value="ussd">ussd</option>
                <option value="bankaccount">Bank Account</option>
              </select>
            </div>
          </div> */}
        </section>
        <section className="checkoutOptions">
          <Link to={"/"}>
            <p>
              <AiOutlineLeft /> Go back & continue ordering
            </p>
          </Link>

          <button
            onClick={() => {
              handleFlutterPayment({
                callback: async (response) => {
                  console.log(response);
                  if (response.status === "successful") {
                    const ordersObj = {
                      orderItems: cartItems,
                      subTotal: subTotal,
                      deliveryFee: totalItems * 500,
                      total: subTotal + totalItems * 500,
                    };
                    await pushOrdersToDatabase(user.id, ordersObj);
                    navigate("/orders");
                  }
                },
              });
            }}
          >
            CONFIRM ORDER
          </button>
        </section>
      </div>
    </main>
  );
};

export default Checkout;
