import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import { Navigation } from "swiper/modules";
import InfoElement from "../InfoElement";
import SwiperCore from "swiper";
import ArrowInfo from "../../assets/icon/arrow-info.svg";

const InfoSwiper = (props: IInfoSwiper) => {
  const { data } = props;
  const swiperRef = useRef<SwiperCore>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
    }
  }, [data]);

  return (
    <div className={styles["main"]}>
      <button
        className={`${styles["next"]} ${isStart && styles["disabled"]}`}
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isStart}
      >
        <ArrowInfo />
      </button>

      <button
        className={`${styles["prev"]} ${isEnd && styles["disabled"]}`}
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
      >
        <ArrowInfo />
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        allowTouchMove={true}
        onProgress={(swiper) => {
          setIsStart(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className={styles["swiper"]}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
          768: {
            spaceBetween: 80,
            slidesPerView: 3,
          },
        }}
      >
        {data.map((el, i) => (
          <SwiperSlide key={`infoSwiper-${i}`}>
            <InfoElement date={el.date} text={el.text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default InfoSwiper;
