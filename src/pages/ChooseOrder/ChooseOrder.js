import React from "react";
import { chooseOrder } from "../../utils/data";

import ChooseDishes from "../../components/ChooseDishes";
import ChooseDrinks from "../../components/ChooseDrinks";

const ChooseOrder = () => {
  return (
    <main className="ChooseOrder">
      <section>
        <div className="chooseSectionWrapper">
          <h2>Choose your Order here</h2>
          <div className="chooseContainer">
            <ChooseDishes chooseDishes={chooseOrder.Dishes} />
            <ChooseDrinks />
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default ChooseOrder;
