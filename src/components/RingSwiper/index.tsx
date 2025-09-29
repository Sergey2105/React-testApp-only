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
import SwiperCore from "swiper";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const RingSwiper = (props: IRingSwiper) => {
  const { periodsData } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperCore>(null);
  const Tablet = useMediaQuery(1024);

  const padNumber = (num: number, length: number = 2) => {
    return num.toString().padStart(length, "0");
  };

  useEffect(() => {
    if (!infoRef.current) return;

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: Tablet ? 10 : 0 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
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
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{ el: ".pagination", clickable: true }}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
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
          periodsData={periodsData}
          activeIndex={activeIndex}
          onDotClick={(index) => swiperRef.current?.slideTo(index)}
        />
      </div>
      <div className={styles["wrapper"]}>
        <div ref={infoRef}>
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
            <div className={styles["pages"]}>
              <span className={styles["pages-number"]}>
                {padNumber(activeIndex + 1)}
              </span>
              <span className={styles["pages-slash"]}>/</span>
              <span className={styles["pages-number"]}>
                {padNumber(periodsData.length)}
              </span>
            </div>
            <div className={styles["navigation"]}>
              <button className={`${styles["navigation-prev"]} prev`}>
                <Arrow />
              </button>
              <button className={`${styles["navigation-next"]} next`}>
                <Arrow />
              </button>
            </div>
          </div>

          <div className={`${styles["pagination"]} pagination`}></div>
        </div>
      </div>
    </div>
  );
};

export default RingSwiper;
