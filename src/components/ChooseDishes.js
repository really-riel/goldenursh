import React from "react";
import { useState } from "react";

import DishOptions from "./DishOptions";
import { chooseOrderHeading } from "../utils/data";
import { useStoreActions, useStoreState } from "easy-peasy";

const ChooseDishes = ({ chooseDishes }) => {
  const {
    mainDish,
    garnishing,
    soupPrice,
    mainDishPrice,
    garnishingPrice,
    soup,
    mainDishQty,
    garnishingQty,
    soupQty,
  } = useStoreState((state) => state.chooseOrder);

  const {
    setMainDishPrice,
    setMainDish,
    setGarnishingPrice,
    setGarnishing,
    setSoupPrice,
    setSoup,
    setMaindishQty,
    setGarnishingQty,
    setSoupQty,
  } = useStoreActions((actions) => actions.chooseOrder);

  return (
    <div className="chooseDishes">
      <h2>Dishes</h2>

      <div className="mainDish">
        <DishOptions
          heading={chooseOrderHeading.dishes.mainDish}
          dishOptions={chooseDishes.mainDish}
          dish={mainDish}
          setDish={setMainDish}
          dishPrice={mainDishPrice}
          setDishPrice={setMainDishPrice}
          dishQty={mainDishQty}
          setDishQty={setMaindishQty}
        />
      </div>
      <div className="garnishing">
        <DishOptions
          heading={chooseOrderHeading.dishes.garnishing}
          dishOptions={chooseDishes.garnishing}
          dish={garnishing}
          setDish={setGarnishing}
          dishPrice={garnishingPrice}
          setDishPrice={setGarnishingPrice}
          dishQty={garnishingQty}
          setDishQty={setGarnishingQty}
        />
      </div>
      <div className="soup">
        <DishOptions
          heading={chooseOrderHeading.dishes.soup}
          dishOptions={chooseDishes.soup}
          dish={soup}
          setDish={setSoup}
          dishPrice={soupPrice}
          setDishPrice={setSoupPrice}
          dishQty={soupQty}
          setDishQty={setSoupQty}
        />
      </div>
    </div>
  );
};

export default ChooseDishes;
