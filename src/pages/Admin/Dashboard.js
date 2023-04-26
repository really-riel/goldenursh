import React from "react";
import useGetCollection from "../../hooks/useGetCollection";
import SummaryCard from "../../components/Admin/SummaryCard";
import { BiCalendar } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import PieChart from "../../components/Admin/PieChart";
import { pieData, summaryCardData } from "../../utils/data";

const Dashboard = () => {
  const {} = useGetCollection("orders");

  return (
    <main className="Dashboard">
      <h1>Dashboard</h1>
      <p>
        Welcome, Goldenursh Admin. <br /> Here's your restaurant <br />
        Overview
      </p>
      <section className="summary">
        <h2>Summary</h2>
        <div className="summaryCardContainer">
          {summaryCardData.map((data, index) => (
            <SummaryCard
              key={index}
              total={data.total}
              category={data.category}
            />
          ))}
        </div>
      </section>
      <section className="analytics">
        <h2>Analytics</h2>

        <div className="salesSummaryContainer">
          <div className="sales">
            <p>Sales Summary</p>
            <div className="salesCalendarContainer">
              <button>Monthly</button>
              <div className="salesCalendar">
                <BiCalendar />
                <BsChevronDown />
              </div>
            </div>
          </div>
          <div className="salesMainContainer">
            <div className="salesTotal">
              <p className="number">5000</p>
              <p>Total Sales</p>
            </div>
            <div className="pieContainer">
              <PieChart />
            </div>
            <div className="cardWrapper">
              {pieData.map((data) => (
                <SummaryCard
                  key={data.id}
                  total={data.quantity}
                  category={data.itemSold}
                  type={data.type}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
