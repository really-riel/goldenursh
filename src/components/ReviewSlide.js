import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "./ReviewCard";

const ReviewSlide = ({ customerReview }) => {
  return (
    <div className="reviewSlide">
      {customerReview?.map((data, index) => (
        <ReviewCard data={data} key={index} />
      ))}
    </div>
  );
};

export default ReviewSlide;
