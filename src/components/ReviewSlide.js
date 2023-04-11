import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Navigation } from "swiper";

import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { useRef } from "react";

const ReviewSlide = ({ customerReview }) => {
  const [init, setInit] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="reviewSlideContainer">
      <div className="sliderBtnLeft" ref={prevRef}>
        <IoIosArrowDropleft />
      </div>
      <div className="reviewSlide">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            375: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation]}
          onInit={() => setInit(true)}
          className="swiper"
        >
          {customerReview?.map((data, index) => (
            <SwiperSlide key={index} className="reviewCardContainer">
              <ReviewCard data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="sliderBtnRight" ref={nextRef}>
        <IoIosArrowDropright />
      </div>
    </div>
  );
};

export default ReviewSlide;
