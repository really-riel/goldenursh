import React from "react";
import DishOptions from "./DishOptions";
import { chooseOrder, chooseOrderHeading } from "../utils/data";
import { useState } from "react";

const ChooseDrinks = ({ chooseDrinks }) => {
  const [drink, setDrink] = useState("");
  const [drinkPrice, setDrinkPrice] = useState(null);
  const [fruitJuice, setFruitJuice] = useState("");
  const [fruitJuicePrice, setFruitJuicePrice] = useState(null);

  return (
    <div className="chooseDrinks">
      <h2>Drinks</h2>
      <div className="drink">
        <DishOptions
          heading={chooseOrderHeading.drinks.drink}
          dishOptions={chooseOrder.Drinks.Drink}
          dish={drink}
          setDish={setDrink}
          dishPrice={drinkPrice}
          setDishPrice={setDrinkPrice}
        />
      </div>
      <div className="fruitJuice">
        <DishOptions
          heading={chooseOrderHeading.drinks.FruitJuice}
          dishOptions={chooseOrder.Drinks.FruitJuice}
          dish={fruitJuice}
          setDish={setFruitJuice}
          dishPrice={fruitJuicePrice}
          setDishPrice={setFruitJuicePrice}
        />
      </div>
    </div>
  );
};

export default ChooseDrinks;
