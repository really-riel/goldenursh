import React from "react";
import { BsCartFill, BsFillSendFill } from "react-icons/bs";
import { IoMdFlash } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";
import {
  RiArrowDownFill,
  RiArrowRightFill,
  RiArrowUpFill,
} from "react-icons/ri";
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
import img1 from "../../assets/connectImg1.png";
import img2 from "../../assets/connectImg2.png";
import { motion } from "framer-motion";
import useGetCollection from "../../hooks/useGetCollection";
import Loading from "../../components/Loading";

const Home = () => {
  const [isViewAll, setIsViewAll] = useState(false);

  const { docItems, isLoading } = useGetCollection("dishes");

  return (
    <main className="Home">
      {/* Meal slider */}
      <section className=" mealSliderContainer ">
        <div className="mealSlider  shapedividers_com-9855">
          <MealSlider />
          <div className="about">
            <div>
              <p>
                Scrumptious meal Ordering <br /> and Delivery made easy <br />
                with new Goldenursh <br />
                Order site.
              </p>
            </div>
            <a href="#trendingOrders">
              <button>Order now</button>
            </a>
          </div>
        </div>
        <div className="featuresContainer">
          <div className="feature left">
            <div className="iconOne">
              <BsFillSendFill />
            </div>
            <p>
              Pick an Order easily <br /> based on Trends
            </p>
          </div>
          <div className="feature">
            <div className="iconTwo">
              <BsCartFill />
            </div>

            <p>
              Pick an Order based <br /> your preference
            </p>
          </div>
          <div className="feature right">
            <div className="iconThree">
              <IoMdFlash />
            </div>

            <p>
              Have your order <br /> delivered in a jiffy
            </p>
          </div>
        </div>
      </section>

      {/* trending Orders */}
      <section
        id="trendingOrders"
        className="trendingOrders shapedividers_com-9343"
      >
        <h2>TRENDING ORDER</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="trendingOrdersList">
            {docItems
              ?.slice(0, !isViewAll ? 6 : trendingOrders?.length)
              .map((item, index) => (
                <TMealCard key={index} item={item} />
              ))}
          </div>
        )}
        {docItems?.length > 6 && (
          <motion.span
            whileTap={{ scale: 0.8 }}
            className="viewAll"
            onClick={() => setIsViewAll(!isViewAll)}
          >
            {isViewAll ? (
              <>
                Hide
                <RiArrowUpFill />
              </>
            ) : (
              <>
                {" "}
                View all <RiArrowDownFill />
              </>
            )}
          </motion.span>
        )}
      </section>
      {/* your choice */}
      <section id="yourChoice" className="yourChoice">
        <h2>ORDER BASED ON YOUR CHOICE</h2>
        <div className="yourChoiceList">
          {yourChoiceMeals?.map((item, index) => (
            <YourChoiceCard key={index} item={item} />
          ))}
        </div>
        {/* review */}
      </section>
      {customerReview && (
        <section className="review">
          <h2>CUSTOMER REVIEW</h2>
          <ReviewSlide customerReview={customerReview} />
        </section>
      )}

      {/* connect */}
      <section className="connect">
        <h2>CONNECT WITH US</h2>
        <div className="connectSections">
          <div className="section1Container">
            <figure className="section1">
              <img src={img1} alt="connectImg" />
              <ul>
                <li>
                  <IoCheckboxOutline />
                  <span> Connect with us via our social media handles</span>
                </li>
                <li>
                  <IoCheckboxOutline />
                  <span>Chat and Make enquires about your Order</span>
                </li>
                <li>
                  <IoCheckboxOutline />
                  <span>Fast reply from our social media handler</span>
                </li>
              </ul>
            </figure>
          </div>
          <div className="section2Container">
            <figure className="section2">
              <p>
                Welcome <br /> This is Goldenursh <br /> support line.
              </p>

              <img src={img2} alt="connectImg" />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
