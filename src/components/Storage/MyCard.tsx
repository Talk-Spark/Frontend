"use client";
import Button from "../common/Button";
import { useState } from "react";
import StorageNameCard from "../StorageNameCard";
import QrCard from "./QrCard";

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

const MyCard = ({ isVisible }: { isVisible: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const btnText = isFlipped ? "내 명함 확인하기" : "내 명함 공유하기";

  const oneCard: NameCardProps = {
    name: "최정인",
    age: 28,
    color: "blue",
    cardId: 1,
    teamName: "팀명",
    major: "전공",
    mbti: "INTJ",
    hobby: "텍스트영역텍스트영역텍스트영역텍스트",
    lookAlike: "텍스트영역텍스트영역텍스트영역텍스트",
    selfDescription: "텍스트영역텍스트영역텍스트영역텍스트",
    tmi: "텍스트영역텍스트영역텍스트영역텍스트",
    isFull: true,
    isStorage: true,
  };

  const cardBackground =
    oneCard.color === "blue"
      ? "bg-gradient-to-b from-white via-[#dbe1fa] to-[#afbcfc]"
      : oneCard.color === "green"
        ? "bg-gradient-to-b from-white via-[#def6f1] to-[#c2f9ef]"
        : oneCard.color === "yellow"
          ? "bg-gradient-to-b from-[#FFF] to-[#f9e9b3]"
          : "bg-gradient-to-b from-[#ffffff] to-[#fdcbdf]";

  return (
    <div
      className={`${cardBackground} h-[100vh] w-full transform items-center justify-center bg-gray-1 px-[2rem]`}
    >
      <div className="flex flex-col items-center gap-[3.7rem]">
        <div className="flex w-full justify-center">
          {/* 카드 회전 효과 적용 */}
          <div
            className={`relative h-[49.3rem] w-[33.5rem] transform`}
            style={{
              transform: isFlipped
                ? "perspective(1000px) rotateY(180deg)"
                : "perspective(1000px) rotateY(0deg)",
              transition: "transform 1s",
              transformStyle: "preserve-3d",
            }}
          >
            {/* 앞면 카드 */}
            <div
              className={`${
                isVisible ? "opacity-100" : "opacity-0"
              } w-full transition-opacity duration-700`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <StorageNameCard {...oneCard} />
            </div>
            {/* 뒷면 카드 */}
            <div
              className="w-[33.5rem]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden", // 뒷면 카드 숨기기
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <QrCard
                color={oneCard.color || "pink"}
                cardId={oneCard.cardId}
                name={oneCard.name}
              />
            </div>
          </div>
        </div>
        <Button onClick={() => setIsFlipped((prev) => !prev)}>{btnText}</Button>
      </div>
    </div>
  );
};

export default MyCard;
