interface IData {
  dateStart: number;
  dateEnd: number;
  theme: string;
  info: { date: number; text: string }[];
}

interface IAnimatedNumberProps {
  targetValue: number;
  duration?: number;
  ease?: string;
  className?: string;
}

interface IInfoElement {
  date: number;
  text: string;
}

interface IInfoSwiper {
  data: {
    date: number;
    text: string;
  }[];
}

interface IRingData {
  dateStart: number;
  dateEnd: number;
}

interface IRingSwiper {
  periodsData: IData[];
}

interface IRingDate {
  periodsData: IData[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}
