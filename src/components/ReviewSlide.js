import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper";

import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { useRef } from "react";

const ReviewSlide = ({ customerReview }) => {
  const [init, setInit] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="reviewSlide">
      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        freeMode={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[FreeMode, Navigation]}
        onInit={() => setInit(true)}
      >
        {customerReview?.map((data, index) => (
          <SwiperSlide key={index} className="reviewCardContainer">
            <ReviewCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sliderBtnLeft" ref={prevRef}>
        <IoIosArrowDropleft />
      </div>
      <div className="sliderBtnRight" ref={nextRef}>
        <IoIosArrowDropright />
      </div>
    </div>
  );
};

export default ReviewSlide;
