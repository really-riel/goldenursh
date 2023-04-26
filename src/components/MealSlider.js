import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { mealSliderImages } from "../utils/data";
import { Autoplay } from "swiper";

const MealSlider = () => {
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 5000,
      }}
      modules={[Autoplay]}
    >
      {mealSliderImages?.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MealSlider;
