"use client";
import React, { useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import favStar from "@/public/nameCard/Star.svg";
import favPinkStar from "@/public/nameCard/pinkStar.svg";
import StorageNameCard from "@/src/components/StorageNameCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "@/src/components/Storage/Arrow";

type NameCardProps = {
  cardId: number;
  teamName: string;
  name: string;
  age: number;
  major: string;
  mbti?: string;
  hobby?: string;
  lookAlike?: string;
  selfDescription?: string;
  tmi?: string;
  color?: "pink" | "green" | "yellow" | "blue";
  isFull?: boolean;
  isStorage?: boolean;
};

// 더미 데이터
const otherCards: NameCardProps[] = [
  {
    cardId: 1,
    teamName: "멋쟁이 데모팀",
    name: "최정인",
    age: 28,
    major: "전공1",
    mbti: "INTJ",
    hobby: "독서, 운동",
    lookAlike: "텍스트영역텍스트영역텍스트영역텍스트",
    selfDescription: "텍스트영역텍스트영역텍스트영역텍스트",
    tmi: "텍스트영역텍스트영역텍스트영역텍스트",
    color: "blue",
    isFull: true,
    isStorage: false,
  },
  {
    cardId: 2,
    teamName: "프론트엔드팀",
    name: "김동욱",
    age: 26,
    major: "전공2",
    mbti: "ENTP",
    hobby: "텍스트영역텍스트영역텍스트영역텍스트",
    lookAlike: "텍스트영역텍스트영역텍스트영역텍스트",
    selfDescription: "텍스트영역텍스트영역텍스트영역텍스트",
    tmi: "텍스트영역텍스트영역텍스트영역텍스트",
    color: "pink",
    isFull: true,
    isStorage: false,
  },
  {
    cardId: 3,
    teamName: "백엔드팀",
    name: "박하경",
    age: 30,
    major: "전공3",
    mbti: "INFJ",
    hobby: "텍스트영역텍스트영역텍스트영역텍스트",
    lookAlike: "텍스트영역텍스트영역텍스트영역텍스트",
    selfDescription: "텍스트영역텍스트영역텍스트영역텍스트",
    tmi: "텍스트영역텍스트영역텍스트영역텍스트",
    color: "green",
    isFull: true,
    isStorage: false,
  },
  {
    cardId: 4,
    teamName: "백엔드팀",
    name: "김민우",
    age: 30,
    major: "전공3",
    mbti: "INFJ",
    hobby: "텍스트영역텍스트영역텍스트영역텍스트",
    lookAlike: "텍스트영역텍스트영역텍스트영역텍스트",
    selfDescription: "텍스트영역텍스트영역텍스트영역텍스트",
    tmi: "텍스트영역텍스트영역텍스트영역텍스트",
    color: "green",
    isFull: true,
    isStorage: false,
  },
];

const DetailCard = () => {
  const [isFav, setIsFav] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slickRef = useRef<Slider | null>(null);

  const previous = useCallback(() => {
    slickRef.current?.slickPrev();
  }, []);

  const next = useCallback(() => {
    slickRef.current?.slickNext();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "81px",
    speed: 500,
    slidesToShow: 1,
    focusOnSelect: true,
    arrows: false,
    swipeToSlide: true,
    initialSlide: 0,
    afterChange: (index: number) => setCurrentIndex(index),
  };

  return (
    <div className="relative -mx-[2rem] flex w-[calc(100%+4rem)] flex-col items-center justify-center overflow-hidden pb-[4rem]">
      {/* 즐겨찾기 */}
      <div className="mb-[2rem] mt-[1.6rem] flex w-[37.5rem] flex-col items-center justify-center gap-[0.8rem]">
        <Image
          src={isFav ? favPinkStar : favStar}
          onClick={() => setIsFav(!isFav)}
          alt="즐겨찾기"
        />
        <span className="text-headline-5">멋쟁이 데모팀😎</span>
      </div>
      {/* 슬라이더 */}
      <div className="h-[60.3rem] w-[50rem]">
        <Slider {...sliderSettings} ref={slickRef}>
          {otherCards.map((card, index) => (
            <div key={card.cardId} className="flex justify-center">
              <div
                className={`${
                  index === currentIndex
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-80"
                } flex w-[35rem] items-center justify-normal transition-all duration-200 ease-in-out`}
              >
                <StorageNameCard {...card} />
              </div>
            </div>
          ))}
        </Slider>
        <Arrow
          otherCards={otherCards}
          previous={previous}
          next={next}
          currentIndex={currentIndex}
        />
      </div>{" "}
    </div>
  );
};

export default DetailCard;
