import React, { useState, useEffect } from "react";
import type { EmblaOptionsType } from "embla-carousel";
// import { DotButton, useDotButton } from './EmblaCarouselUtils'
import { usePrevNextButtons } from "./EmblaCarouselUtils";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineDateRange,
} from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import "./carousel.css";
import { Link } from "react-router-dom";
import { formatLatinDate } from "../../utils/latinDate";
import { slugifyTitle } from "../../utils/slugTitle";
type PropType = {
  slides: CNNProps[]|null|undefined;
  options?: EmblaOptionsType;
  isLoading?: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, isLoading } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapList, setScrollSnapList] = useState<number[]>([]);
// use effect for fetching size of the slide
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnapList(emblaApi.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi,isLoading]);
  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {/* Skeleton Loading */}
          {isLoading ? (
            <div className="embla__slide">
              <div className="h-[26.063rem] flex justify-between w-full ">
                <div className="h-full flex justify-between gap-4 w-full">
                  <div className="flex flex-col gap-2 w-[505px]">
                    <div className="w-full h-8 rounded-full bg-gray-500 animate-pulse" />
                    <div className="w-full h-8 rounded-full bg-gray-500 animate-pulse" />
                    <div className="w-full h-8 rounded-full bg-gray-500 animate-pulse" />
                    <div className="flex flex-col gap-2">
                      <div className="w-full h-4 rounded-full bg-gray-500 animate-pulse" />
                      <div className="w-full h-4 rounded-full bg-gray-500 animate-pulse" />
                      <div className="flex gap-2">
                        <div className="w-1/2 h-4 rounded-full bg-gray-500 animate-pulse" />
                        <div className="w-1/2 h-4 rounded-full bg-gray-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-full w-[637px] bg-gray-500 animate-pulse rounded-[20px] overflow-hidden`}
                  />
                </div>
              </div>
            </div>
          ) : (
            // main slide/content
            slides?.map((news, index) => (
              <div className="embla__slide" key={index}>
                <div className="h-[26.063rem] flex justify-between w-full text-black">
                  <div className="h-full flex flex-col gap-4 w-[505px] text-Gray2">
                    {/* Title carousel */}
                    <p className="text-[#526071]">Headline</p>
                    <h1 className="text-Gray1 text-4xl">{news.title}</h1>
                    {/* Content */}
                    <p className=" line-clamp-4 text-ellipsis">
                      {news.description}
                    </p>
                    {/* Date */}
                    <p className="flex gap-2 items-center">
                      <MdOutlineDateRange />
                      {formatLatinDate(news.pubDate)}
                    </p>
                    {/* Link */}
                    <Link to={`/beranda/nasional/${slugifyTitle(news.title)}`} className="flex gap-2 items-center text-button-primary">
                      Baca Selengkapnya <BsArrowUpRight />
                    </Link>
                  </div>
                  {/* Gambar */}
                  <div
                    className={`h-full w-[637px] ${
                      isLoading ? "bg-gray-500 animate-pulse" : ""
                    } rounded-[20px] overflow-hidden`}
                  >
                    <img
                      src={news.thumbnail}
                      alt={news.thumbnail}
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 text-secondary justify-center mt-4">
        <button onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
          <MdKeyboardArrowLeft />
        </button>

        <span className="text-sm">
          {selectedIndex + 1} <span className="mx-1">dari</span>{" "}
          {scrollSnapList.length}
        </span>

        <button onClick={onNextButtonClick} disabled={nextBtnDisabled}>
          <MdKeyboardArrowRight />
        </button>
      </div>
    </section>
  );
};

export default EmblaCarousel;
