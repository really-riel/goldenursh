import React from "react";
import { BsCartFill, BsFillSendFill } from "react-icons/bs";
import { IoMdFlash } from "react-icons/io";
import { RiArrowRightFill } from "react-icons/ri";

import MealSlider from "../../components/MealSlider";
import {
  customerReview,
  trendingOrders,
  yourChoiceMeals,
} from "../../utils/data";
import TMealCard from "../../components/TMealCard";
import { useState } from "react";
import YourChoiceCard from "../../components/YourChoiceCard";
import ReviewSlide from "../../components/ReviewSlide";

const Home = () => {
  const [isViewAll, setIsViewAll] = useState(false);
  return (
    <main className="Home">
      <section className="mealSlider shapedividers_com-9855">
        <MealSlider />
        <div className="about">
          <div>
            <p>Scrumptious meal Ordering</p>
            <p>and Delivery made easy </p>
            <p>with new Goldenursh</p>
            <p>Order site.</p>
          </div>
          <button>Order now</button>
        </div>
        <div className="featuresContainer">
          <div className="feature left">
            <div className="iconOne">
              <BsFillSendFill />
            </div>
            <p>Pick an Order easily based on Trends</p>
          </div>
          <div className="feature">
            <div className="iconTwo">
              <BsCartFill />
            </div>

            <p>Pick an Order based your preference</p>
          </div>
          <div className="feature right">
            <div className="iconThree">
              <IoMdFlash />
            </div>

            <p>have your order delivered in a jiffy</p>
          </div>
        </div>
      </section>
      <section className="trendingOrders shapedividers_com-9343">
        <h2>TRENDING ORDER</h2>
        <div className="trendingOrdersList">
          {trendingOrders
            ?.slice(0, !isViewAll ? 6 : trendingOrders?.length)
            .map((item, index) => (
              <TMealCard key={index} item={item} />
            ))}
        </div>

        <span onClick={() => setIsViewAll(!isViewAll)}>
          View all <RiArrowRightFill />
        </span>
      </section>
      {}
      <section className="yourChoice">
        <h2>ORDER BASED ON YOUR CHOICE</h2>
        {yourChoiceMeals?.map((item, index) => (
          <YourChoiceCard key={index} item={item} />
        ))}
      </section>
      {customerReview && (
        <section className="review">
          <h2>CUSTOMER REVIEW</h2>
          <ReviewSlide customerReview={customerReview} />
        </section>
      )}
    </main>
  );
};

export default Home;
