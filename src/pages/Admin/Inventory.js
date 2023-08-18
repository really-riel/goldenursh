import React from "react";
import {
  BiEdit,
  BiEditAlt,
  BiMessageSquareAdd,
  BiSearch,
} from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";

const Inventory = () => {
  const data = [
    { quantity: 10, type: "Main" },
    { quantity: 5, type: "Garnishng" },
    { quantity: 9, type: "Drinks" },
  ];

  const header = ["Category", "Quantity left", "Notification", "Action"];

  const main = [
    {
      food: "Rice",
      category: "Main",
      qtyLeft: "5 Sacks",
      notification: "Restock",
    },
    {
      food: "Meat",
      category: "Garnishing",
      qtyLeft: "25 Pieces",
      notification: "Okay",
    },
    {
      food: "Spagetti",
      category: "Main",
      qtyLeft: "5 Cartons",
      notification: "Average",
    },
  ];
  const drinksMain = [
    {
      drink: "Coca-cola",
      category: "Soft Drink",
      qtyLeft: "5 packs",
      notification: "Restock",
    },
    {
      drink: "Five Alive",
      category: "Fruit juice",
      qtyLeft: "25 Pieces",
      notification: "Okay",
    },
    {
      drink: "Smoothie",
      category: "Fruit Juice",
      qtyLeft: "5 Cartons",
      notification: "Average",
    },
  ];

  return (
    <main className="Inventory">
      <div className="mainWrapper">
        <h1>Inventory</h1>
        <p>
          View and update your stock <br /> status
        </p>
        <section className="cards">
          {data.map((item, index) => (
            <div key={index} className="card">
              <p className="qty">{item.quantity}</p>
              <p className="info">
                {item.type} restock <br /> needed{" "}
              </p>
            </div>
          ))}
        </section>
        <section className="forDishes">
          <div className="forHeader">
            <h2>For Dishes</h2>

            <form action="" className="searchForm">
              <input type="text" placeholder="search" />
              <BiSearch />
            </form>
          </div>
          <div className="tableContainer">
            <div className="table">
              <div className="header">
                <p>Food stuff</p>
                {header.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <div className="body">
                {main.map((item, index) => (
                  <div key={index} className="details">
                    <p> {item.food} </p>
                    <p> {item.category} </p>
                    <p> {item.qtyLeft} </p>

                    <p
                      className={`notify
                      ${
                        item.notification.toLowerCase() === "restock"
                          ? "restock"
                          : item.notification.toLowerCase() === "okay"
                          ? "okay"
                          : "average"
                      }`}
                    >
                      {" "}
                      {item.notification}{" "}
                    </p>

                    <div className="actionBtns">
                      <button className="actionBtn">
                        <BiEditAlt />
                      </button>
                      <button className="actionBtn">
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="controlBtns">
            <button className="viewAll">View All</button>
            <button className="addNewBtn">
              Add new <BiMessageSquareAdd />
            </button>
          </div>
        </section>
        <section className="forDrinks">
          <div className="forHeader">
            <h2>For Drinks</h2>
            <form action="" className="searchForm">
              <input type="text" placeholder="search" />
              <BiSearch />
            </form>
          </div>
          <div className="tableContainer">
            <div className="table">
              <div className="header">
                <p>Drinks</p>
                {header.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <div className="body">
                {drinksMain.map((item, index) => (
                  <div key={index} className="details">
                    <p> {item.drink} </p>
                    <p> {item.category} </p>
                    <p> {item.qtyLeft} </p>

                    <p
                      className={`notify
                      ${
                        item.notification.toLowerCase() === "restock"
                          ? "restock"
                          : item.notification.toLowerCase() === "okay"
                          ? "okay"
                          : "average"
                      }`}
                    >
                      {" "}
                      {item.notification}{" "}
                    </p>

                    <div className="actionBtns">
                      <button className="actionBtn">
                        <BiEditAlt />
                      </button>
                      <button className="actionBtn">
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="controlBtns">
            <button className="viewAll">View All</button>
            <button className="addNewBtn">
              Add new <BiMessageSquareAdd />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Inventory;
