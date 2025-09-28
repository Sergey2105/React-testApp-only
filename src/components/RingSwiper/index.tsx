import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import Arrow from "../../assets/icon/arrow.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import RingDate from "../RingDate";
import InfoSwiper from "../InfoSwiper";
import { Navigation, Pagination } from "swiper/modules";

const RingSwiper = (props: RingSwiperProps) => {
  const { periodsData } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const padNumber = (num: number, length: number = 2) => {
    return num.toString().padStart(length, "0");
  };

  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [activeIndex]);

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.activeIndex;
    setActiveIndex(newIndex);
  };

  return (
    <div className={styles["main"]}>
      <Swiper
        modules={[Navigation, Pagination]}
        onSlideChange={handleSlideChange}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ el: ".custom-pagination", clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        allowTouchMove={true}
      >
        {periodsData.map((_, i) => (
          <SwiperSlide key={i}></SwiperSlide>
        ))}
      </Swiper>
      <div className={styles["date"]}>
        <RingDate
          dateStart={periodsData[activeIndex].dateStart}
          dateEnd={periodsData[activeIndex].dateEnd}
        />
      </div>
      <div className={styles["wrapper"]}>
        <div ref={wrapperRef}>
          <span className={styles["theme"]}>
            {periodsData[activeIndex].theme}
          </span>
          <div className={styles["line"]}></div>

          <div className={styles["info"]}>
            <InfoSwiper data={periodsData[activeIndex].info} />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["control"]}>
            <div className={styles["page"]}>
              <span className={styles["number"]}>
                {padNumber(activeIndex + 1)}
              </span>
              <span className={styles["slash"]}>/</span>
              <span className={styles["number"]}>
                {padNumber(periodsData.length)}
              </span>
            </div>
            <div className={styles["navigation"]}>
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
      </div>
    </div>
  );
};

export default RingSwiper;
