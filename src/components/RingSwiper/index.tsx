import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import Arrow from "../../assets/icon/arrow.svg";

import { gsap } from "gsap";
import styles from "./index.module.scss";
import RingDate from "../RingDate";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface RingSwiperProps {
  periodsData: IData[];
}

const RingSwiper: React.FC<RingSwiperProps> = ({ periodsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const padNumber = (num: number, length: number = 2) => {
    return num.toString().padStart(length, "0");
  };

  return (
    <div className={styles["main"]}>
      {/* Индикатор слайдов 01/06 */}

      <Swiper
        modules={[Navigation, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ el: ".custom-pagination", clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {periodsData.map((el, i) => (
          <SwiperSlide key={i}>
            <RingDate periodsData={el} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <div className={styles["data-dots"]}>
          {padNumber(activeIndex + 1)} / {padNumber(periodsData.length)}
        </div>
        <div className={styles["custom-navigation"]}>
          <button className="custom-prev">
            <Arrow />
          </button>
          <button className="custom-next">
            <Arrow />
          </button>
        </div>
      </div>

      <div className="custom-pagination"></div>
    </div>
  );
};

export default RingSwiper;
