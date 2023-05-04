import React from "react";
import useGetCollection from "../../hooks/useGetCollection";
import SummaryCard from "../../components/Admin/SummaryCard";
import { BiCalendar } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import PieChart from "../../components/Admin/PieChart";
import { orderSummaryData, pieData, summaryCardData } from "../../utils/data";
import SalesTopCard from "../../components/Admin/SalesTopCard";
import LineChart from "../../components/Admin/LineChart";
import AreaChart from "../../components/Admin/AreaChart";
import OrderCard from "../../components/Admin/OrderCard";
import DrinksCard from "../../components/Admin/DrinksCard";

const Dashboard = () => {
  return (
    <main className="Dashboard">
      <div className="dashboardWrapper">
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
          <div className="analyticsDetails">
            <div className="salesSummaryContainer">
              <SalesTopCard title={"Sales Summary"} />
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
                    <DrinksCard
                      key={data.id}
                      total={data.quantity}
                      category={data.itemSold}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="revenue">
              <SalesTopCard
                title={"Revenue"}
                label="Last 7 days VS prior week"
              />
              <div className="lineChartContainer">
                <LineChart />
              </div>
            </div>
            <div className="userMap">
              <SalesTopCard title={"User Map"} />
              <div className="areaChartContainer">
                <AreaChart />
              </div>
            </div>
            <div className="orderSummary">
              <SalesTopCard title={"Order Summary"} />
              <div className="orderDetailsWrapper">
                <div className="orderSummaryDetails">
                  {orderSummaryData.map((data, index) => (
                    <OrderCard data={data} key={index} />
                  ))}
                </div>
                <button className="dashboardBtn">500 Total Orders</button>
              </div>
            </div>
          </div>
        </section>
        <button className="dashboardBtn">
          Export each Category report in excel or CSV format
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
