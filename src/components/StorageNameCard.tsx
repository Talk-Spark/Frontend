"use client";
import React, { useEffect, useRef, useState } from "react";

import CardTop from "./Storage/card/CardTop";
import CardBottom from "./Storage/card/CardBotttom";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";

import { saveAs } from "file-saver";
/* 
1. 뒷면 그래픽 위치 조정
2. 명함 수정하기 PUT
3. 애니메이션 수정(시간 되면)
*/

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
  cardThema: "PINK" | "GREEN" | "YELLOW" | "BLUE";
};

type MyNameCardProps = CardDataProps & {
  // 내 명함 response 바디
  // response body
  id: number;
  kakaoId: string;
  ownerId: number;
};

type PutCardProps = CardDataProps & {
  // 내 명함 req putData
  sparkUserId: number;
};

type NameCardProps = {
  oneCard: MyNameCardProps;
  isFull?: boolean;
  isStorage?: boolean;
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
  setSelectedColor?: React.Dispatch<
    React.SetStateAction<"PINK" | "GREEN" | "YELLOW" | "BLUE" | undefined>
  >;
};

const defaultCard: MyNameCardProps = {
  // 기본값
  id: 0,
  kakaoId: "",
  ownerId: 0,
  name: "이름",
  age: 0,
  major: "",
  cardThema: "PINK",
};

const StorageNameCard: React.FC<NameCardProps> = ({
  oneCard = defaultCard,
  isFull = false,
  isStorage = false,
  isEditing,
  setIsEditing,
  setSelectedColor,
}) => {
  // const [selectedColor, setSelectedColor] = useState(oneCard.cardThema); // 색상 상태
  const [putData, setPutData] = useState<PutCardProps>({
    sparkUserId: oneCard?.ownerId,
    ...oneCard,
  });
  const selectedColor = putData ? putData.cardThema : oneCard.cardThema;

  const cardRef = useRef<HTMLDivElement>(null); // Ref to capture the entire card

  const handleDownload = () => {
    if (cardRef.current) {
      console.log("Card ref saved.");

      // Use html2canvas with options to improve rendering
      html2canvas(cardRef.current, {
        backgroundColor: "transparent", // Ensure transparency
        useCORS: true,
        logging: true,
        scale: 2,
      })
        .then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, "StorageNameCard.png");
            }
          });
        })
        .catch((error) => {
          console.error("Error generating image:", error); // Error handling
        });
    } else {
      console.log("Card ref is not found.");
    }
  };

  useEffect(() => {
    if (setSelectedColor && putData) {
      setSelectedColor(putData.cardThema);
    }
  }, [putData]);

  // blue, pink, yellow, green 별 다른 text, graphic 적용
  const contentTextColor =
    selectedColor === "BLUE"
      ? "text-gray-3 text-body-2-med"
      : " text-body-2-med text-gray-10";

  return (
    <div
      ref={cardRef}
      className={`relative bg-transparent ${isFull ? "h-[49.3rem]" : "h-[30.1rem]"} w-[33.5rem] rounded-[2rem]`}
    >
      {/* 첫 번째 사각형 - 상단 */}
      <div className="">
        <CardTop
          oneCard={oneCard}
          putData={putData}
          setPutData={setPutData}
          contentTextColor={contentTextColor}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isFull={isFull}
          isStorage={isStorage}
          handleDownload={handleDownload}
        />
      </div>
      {/* 두 번째 사각형 - 하단 */}
      {isFull && (
        <CardBottom
          oneCard={oneCard}
          putData={putData}
          setPutData={setPutData}
          contentTextColor={contentTextColor}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default StorageNameCard;
