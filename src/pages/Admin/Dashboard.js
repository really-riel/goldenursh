import React from "react";
import useGetCollection from "../../hooks/useGetCollection";

const Dashboard = () => {
  const {} = useGetCollection("orders");

  return (
    <main className="Dashboard">
      <h1>Dashboard</h1>
      <p>
        Welcome, Goldenursh Admin. <br /> Here's your restaurant <br />
        Overview{" "}
      </p>
      <section className="summary">
        <h2>Summary</h2>
      </section>
      <section className="analytics">
        <h2>analytics</h2>
      </section>
    </main>
  );
};

export default Dashboard;
