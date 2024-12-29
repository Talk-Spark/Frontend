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
  storedCardId: number;
  name: string;
  age: number;
  major: string;
  mbti?: string;
  hobby?: string;
  lookAlike?: string;
  slogan?: string;
  tmi?: string;

  bookMark: boolean;
  cardHolderName?: string;
  cardThema: "PINK" | "MINT" | "YELLOW" | "BLUE";
};

// const defaultCard
const DetailCard = () => {
  const [isFav, setIsFav] = useState(false); // 여기 즐겨찾기 put api 구현 필요
  const [currentIndex, setCurrentIndex] = useState(0);
  const slickRef = useRef<Slider | null>(null);
  const { id } = useParams();
  const [otherCards, setOtherCards] = useState<OthersNameCardProps[]>([
    // {
    //   storedCardId: 2,
    //   name: "박승범",
    //   age: 24,
    //   major: "컴퓨터공학과",
    //   mbti: "ISTJ",
    //   hobby: "코딩",
    //   lookAlike: "너구리",
    //   slogan: "개발자가 되",
    //   tmi: "TalkSpark!!!",
    //   cardThema: "PINK",
    //   bookMark: false,
    //   cardHolderName: "멋사우주최강",
    // },
    // {
    //   storedCardId: 3,
    //   name: "박승범",
    //   age: 24,
    //   major: "컴퓨터공학과",
    //   mbti: "ISTJ",
    //   hobby: "코딩",
    //   lookAlike: "너구리",
    //   slogan: "개발자가 되",
    //   tmi: "TalkSpark!!!",
    //   cardThema: "MINT",
    //   bookMark: false,
    //   cardHolderName: "멋사우주최강",
    // },
  ]);

  useEffect(() => {
    if (id) {
      /* 팀 명함 조회하기 */
      const getOthers = async () => {
        try {
          const res = await instance.get(`/api/storedCard/${id}`);
          if (res.data.data) {
            setOtherCards(res.data.data);
            console.log(res.data.data);
          }
        } catch (e) {
          console.log(e);
        }
      };
      getOthers();
    }
    console.log(otherCards);
  }, [isFav]);

  const putFav = async () => {
    await put(`/api/storedCard/${id}`);
    setIsFav(!isFav);
  };

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
          src={otherCards[0]?.bookMark ? favPinkStar : favStar}
          onClick={() => putFav()}
          alt="즐겨찾기"
        />
        <span className="text-headline-5">{otherCards[0]?.cardHolderName}</span>
      </div>
      {/* 슬라이더 */}
      <div className="h-[60.3rem] w-[50rem]">
        {otherCards && otherCards.length > 1 ? (
          <Slider {...sliderSettings} ref={slickRef}>
            {otherCards.map((card, index) => (
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
        ) : (
          <div className="flex justify-center">
            <StorageNameCard
              oneCard={otherCards[0]}
              isFull={true}
              isStorage={false}
            />
          </div>
        )}
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
