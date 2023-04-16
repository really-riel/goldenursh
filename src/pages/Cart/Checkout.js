import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const {
    state: { user, subtotal },
  } = useLocation();
  console.log(user, subtotal);

  const config = {
    public_key: "FLWPUBK_TEST-e6adf87b276c2a924115a43fa9997f91-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card",
    payment_plan: "3341",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    meta: { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  return <main className="Checkout"></main>;
};

export default Checkout;
