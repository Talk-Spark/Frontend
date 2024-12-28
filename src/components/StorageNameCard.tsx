"use client";
import React, { useEffect, useState } from "react";

import QrcodeDown from "./QrCode/QrCodeDown";
import { instance } from "../apis";
import CardTop from "./Storage/card/CardTop";
import CardBottom from "./Storage/card/CardBotttom";

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

  // const qrData = {
  //   // 큐알 다운로드 위한 객체
  //   cardId: id, // 명함 ID
  //   name: name,
  // };
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

  //301 + 192 = 493
  return (
    <div
      className={`relative ${isFull ? "h-[49.3rem]" : "h-[30.1rem]"} w-[33.5rem] rounded-[2rem]`}
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
