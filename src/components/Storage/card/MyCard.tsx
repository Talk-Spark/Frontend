"use client";
import Button from "../../common/Button";
import { useEffect, useState } from "react";
import StorageNameCard from "../../StorageNameCard";
import QrCard from "./QrCard";
import { instance } from "@/src/apis";

type CardDataProps = {
  // 기본 정보
  name: string;
  age: number;
  major: string;
  mbti?: string;
  hobby?: string;
  lookAlike?: string;
  slogan?: string;
  tmi?: string;
  cardThema: "PINK" | "MINT" | "YELLOW" | "BLUE";
};

type MyNameCardProps = CardDataProps & {
  // 내 명함 response 바디
  // response body
  id: number;
  kakaoId: string;
  ownerId?: number;
};

const MyCard = ({ isVisible }: { isVisible: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  // const [isLoading, setIsLoading] = useState(false);
  const [oneCard, setOneCard] = useState<MyNameCardProps>();
  const [selectedColor, setSelectedColor] = useState(
    oneCard?.cardThema || "PINK",
  );

  const btnText = isFlipped ? "내 명함 확인하기" : "내 명함 공유하기";

  /* 내 명함 조회하기 API */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/cards");
        const cardRes = response.data.data[0]; //response.data.data.length - 1

        if (oneCard !== cardRes) {
          setOneCard(cardRes);
        }
        console.log(cardRes);
      } catch (e) {
        console.log(e);
      }
    };
    if (!isEditing) {
      fetchData();
    }
  }, [isEditing]);

  const cardBackground =
    selectedColor === "BLUE"
      ? "bg-gradient-to-b from-white via-[#dbe1fa] to-[#afbcfc]"
      : selectedColor === "MINT"
        ? "bg-gradient-to-b from-white via-[#def6f1] to-[#c2f9ef]"
        : selectedColor === "YELLOW"
          ? "bg-gradient-to-b from-[#FFF] to-[#f9e9b3]"
          : "bg-gradient-to-b from-[#ffffff] to-[#fdcbdf]";

  if (!oneCard) {
    return <div></div>; // oneCard가 로드되지 않은 경우 로딩 표시
  }

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
                backfaceVisibility: "hidden",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <StorageNameCard
                oneCard={oneCard}
                isFull={true}
                isStorage={true}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                setSelectedColor={setSelectedColor}
              />
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
                color={oneCard.cardThema || "PINK"}
                cardId={oneCard.id || 1}
                name={oneCard.name}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={isEditing}
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default MyCard;
