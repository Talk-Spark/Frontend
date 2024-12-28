"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick"; // 모듈 추가
import Image from "next/image";
import favStar from "@/public/nameCard/Star.svg";
import favPinkStar from "@/public/nameCard/pinkStar.svg";
import StorageNameCard from "@/src/components/StorageNameCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "@/src/components/Storage/card/Arrow";
import { useParams } from "next/navigation";
import { instance, put } from "@/src/apis";

type OthersNameCardProps = {
  storedCardId?: number;
  name: string;
  age: number;
  major: string;
  mbti?: string;
  hobby?: string;
  lookAlike?: string;
  slogan?: string;
  tmi?: string;
  cardThema?: "pink" | "green" | "yellow" | "blue";
  bookMark?: boolean;
  cardHolderName?: string;
};

const DetailCard = () => {
  const [isFav, setIsFav] = useState(false); // 여기 즐겨찾기 put api 구현 필요
  const [currentIndex, setCurrentIndex] = useState(0);
  const slickRef = useRef<Slider | null>(null);
  const { id } = useParams();
  const [otherCards, setOtherCards] = useState<OthersNameCardProps[]>([]);

  useEffect(() => {
    if (id) {
      /* 팀 명함 조회하기 */
      const getOthers = async () => {
        try {
          const res = await instance.get(`/api/storedCard/${id}`);
          if (res.data) {
            setOtherCards(res.data);
          }
        } catch (e) {
          console.error(e);
        }
      };
      getOthers();
    }
  }, []);

  useEffect(() => {
    /* 보관된 명함에 대한 즐겨찾기 PUT */
    const putFav = async () => {
      await put(`/api/storedCard/${id}`);
    };
    putFav();
  }, [isFav]);

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
        <span className="text-headline-5">{otherCards[0]?.cardHolderName}</span>
      </div>
      {/* 슬라이더 */}
      <div className="h-[60.3rem] w-[50rem]">
        <Slider {...sliderSettings} ref={slickRef}>
          {otherCards &&
            otherCards.map((card, index) => (
              <div key={card.storedCardId} className="flex justify-center">
                <div
                  className={`${
                    index === currentIndex
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-80"
                  } flex w-[35rem] items-center justify-normal transition-all duration-200 ease-in-out`}
                >
                  <StorageNameCard
                    oneCard={card}
                    isFull={true}
                    isStorage={false}
                  />
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
