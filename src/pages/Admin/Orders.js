import React, { useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import useWindowSize from "../../hooks/useWindowSize";
import { BiCalendar, BiSearch, BiSearchAlt } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { useEffect } from "react";
import useGetCollection from "../../hooks/useGetCollection";
import Loading from "../../components/Loading";
import { MdPending } from "react-icons/md";

const Orders = () => {
  const { width } = useWindowSize();
  const [selectedOption, setSelectedOption] = useState("all orders");
  const [data, setData] = useState([]);
  const [totalAmt, setTotalAmt] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const [totalpending, setTotalPending] = useState("");
  const [totalDelivered, setTotalDelivered] = useState("");

  const handleSelect = (e) => {
    setSelectedOption(e.target.innerText.toLowerCase());
  };
  const { docItems, isLoading } = useGetCollection("orders");
  console.log(docItems);

  useEffect(() => {
    selectedOption === "pending"
      ? setData(docItems?.filter((item) => item.orderStatus === "pending"))
      : selectedOption === "processing"
      ? setData(docItems?.filter((item) => item.orderStatus === "processing"))
      : selectedOption === "delivered"
      ? setData(docItems?.filter((item) => item.orderStatus === "delivered"))
      : setData(docItems);
  }, [docItems, selectedOption]);

  useEffect(() => {
    const sum = docItems?.reduce((acc, item) => {
      return acc + item.total;
    }, 0);

    const qtyArry = docItems?.map((item) => {
      return item.orderItems.reduce((acc, currentitem) => {
        return acc + currentitem.quantity;
      }, 0);
    });

    const qty = qtyArry?.reduce((acc, item) => {
      return acc + item;
    }, 0);

    function countAndMultiply(array, targetValue) {
      return array?.reduce((accumulator, currentObj) => {
        const occurrenceCount = currentObj.orderStatus === targetValue ? 1 : 0;

        if (Array.isArray(currentObj.orderItems)) {
          return accumulator + occurrenceCount * currentObj.orderItems.length;
        }

        return accumulator + occurrenceCount;
      }, 0);
    }

    setTotalQty(qty);

    setTotalAmt(sum);
    setTotalPending(countAndMultiply(docItems, "pending"));
    setTotalDelivered(countAndMultiply(docItems, "delivered"));
  }, [docItems]);

  return (
    <main className="Orders">
      <div className="OrderWrapper">
        <h1>Orders</h1>
        <p>
          Check recent, existing, and <br /> pending order requests
        </p>
        <div className="orderSummary">
          <div
            className={`sect borderRgt  ${width <= 767 ? "borderBtm" : ""} `}
          >
            <p>Total Amount</p>
            <p className="bold">
              <TbCurrencyNaira />
              {totalAmt}
            </p>
          </div>
          <div
            className={`sect ${
              width <= 767 ? "borderBtm" : width > 759 ? "borderRgt" : null
            } `}
          >
            <p>Total Quantity</p>
            <p className="bold">{totalQty}</p>
          </div>
          <div className="sect borderRgt">
            <p>Total Delivered</p>
            <p className="bold">{totalDelivered}</p>
          </div>
          <div className="sect noBorderBtm">
            <p>Pending Orders</p>
            <p className="bold">{totalpending}</p>
          </div>
        </div>

        <section className="RecentOrders">
          <h2>Recent Order Requests</h2>
          <div className="filterOptionsContainer">
            <div className="containerOne">
              <div
                className={`filterOption ${
                  selectedOption === "all orders" ? "selected" : null
                }`}
                onClick={(e) => handleSelect(e)}
              >
                All Orders
              </div>
              <div
                className={`filterOption ${
                  selectedOption === "pending" ? "selected" : ""
                }`}
                onClick={(e) => handleSelect(e)}
              >
                Pending
              </div>
              <div
                className={`filterOption ${
                  selectedOption === "processing" ? "selected" : ""
                }`}
                onClick={(e) => handleSelect(e)}
              >
                Processing
              </div>
              <div
                className={`filterOption ${
                  selectedOption === "delivered" ? "selected" : ""
                }`}
                onClick={(e) => handleSelect(e)}
              >
                Delivered
              </div>
            </div>
            <div className="containerTwo">
              <form action="" className="searchForm">
                <input type="text" placeholder="Search" />
                <BiSearch />
              </form>
              <div className="calenderWrapper">
                <button className="monthlyBtn">Monthly</button>
                <div className="orderCalender">
                  <BiCalendar />
                  <BsChevronDown />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="orderListSect">
          <div className="orderList">
            {data?.length === 0 && !isLoading && (
              <p>No {selectedOption} orders</p>
            )}
            {isLoading && (
              <div className="loadingContainer">
                <Loading />
              </div>
            )}

            {data?.map((items, index) =>
              items.orderItems.map((item, indx) => (
                <div className="orderListItem" key={`${index}-${indx}`}>
                  <img src={item.image} alt="" />
                  <div className="">
                    <p>
                      {item.mainMeal} <br /> {item.extra}
                    </p>
                  </div>
                  <p>X{item.quantity}</p>
                  <p>{item.price}</p>
                  <p>{items.address}</p>
                  <div>
                    <p className={items.orderStatus.toLowerCase()}>
                      {items.orderStatus}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="Order Breakdown">
          {/*  <h2>Order Breakdown</h2> */}
        </section>
      </div>
    </main>
  );
};

export default Orders;
