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
      <div className={styles["control"]}>
        <div className={styles["page"]}>
          <div className={styles["page"]}>
            <span className={styles["number"]}>
              {padNumber(activeIndex + 1)}
            </span>
            <span className={styles["slash"]}>/</span>
            <span className={styles["number"]}>
              {padNumber(periodsData.length)}
            </span>
          </div>
        </div>
        <div className={styles["custom-navigation"]}>
          <button className={`${styles.prev} custom-prev`}>
            <Arrow />
          </button>
          <button className={`${styles.next} custom-next`}>
            <Arrow />
          </button>
        </div>
      </div>

      <div className={`${styles.pagination} custom-pagination`}></div>
    </div>
  );
};

export default RingSwiper;
