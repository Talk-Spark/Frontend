"use client";
import React, { useEffect, useRef, useState } from "react";

import CardTop from "./Storage/card/CardTop";
import CardBottom from "./Storage/card/CardBotttom";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { StaticImageData } from "next/image";

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
  id?: number;
  kakaoId?: string;
  ownerId?: number;
  // 다른 사람 명함 개별 조회
  storedCardId?: number;
  bookMark?: boolean;
  cardHolderName?: string;
};

type PutCardProps = CardDataProps & {
  // 내 명함 req putData
  sparkUserId?: number;
};

type NameCardProps = {
  oneCard: MyNameCardProps;
  otherCard?: OtherCardProps;
  isFull?: boolean;
  isStorage?: boolean;
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
  setSelectedColor?: React.Dispatch<
    React.SetStateAction<"PINK" | "MINT" | "YELLOW" | "BLUE" | undefined>
  >;
};

type OtherCardProps = CardDataProps & {
  storedCardId?: number;
  bookMark?: boolean;
  cardHolderName?: string;
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
  storedCardId: 1,
};

const StorageNameCard: React.FC<NameCardProps> = ({
  oneCard = defaultCard,
  isFull = false,
  isStorage = false,
  isEditing,
  setIsEditing,
  setSelectedColor,
}) => {
  const [putData, setPutData] = useState<PutCardProps>({
    sparkUserId: oneCard?.ownerId,
    ...oneCard,
  });
  const selectedColor = putData ? putData.cardThema : oneCard.cardThema;

  const cardRef = useRef<HTMLDivElement>(null); // Ref to capture the entire card

  const handleDownload = () => {
    if (cardRef.current) {
      console.log("Card ref saved.");

      html2canvas(cardRef.current, {
        backgroundColor: "transparent", // 투명 배경 설정
        useCORS: true,
        logging: true,
        scale: 2,
        ignoreElements: (element) => element.tagName === "BUTTON", // 버튼 필터링
      })
        .then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, "명함.png");
            }
          });
        })
        .catch((error) => {
          console.error("Error generating image:", error); // 오류 처리
        });
    } else {
      console.log("Card ref is not found.");
    }
  };

  useEffect(() => {
    if (setSelectedColor && putData) {
      setSelectedColor(putData?.cardThema);
    }
  }, [putData]);

  // blue, pink, yellow, green 별 다른 text, graphic 적용

  // 편집 모드일 때 렌더링되는 색상 변경 UI
  // const renderColorChangeButtons = () => (
  //   <div className="absolute right-[2.8rem] top-[3.2rem] flex flex-col gap-[1.6rem]">
  //     <button
  //       onClick={handleEditToggle}
  //       className={`rounded-lg ${completeBtn}`}
  //     >
  //       완료
  //     </button>
  //     <div className="flex w-full flex-col items-center justify-around gap-[1.4rem]">
  //       {(["PINK", "YELLOW", "GREEN", "BLUE"] as const).map((c) => (
  //         <button
  //           key={c}
  //           onClick={() => handleColorChange(c)}
  //           className={`h-[2.8rem] w-[2.8rem] rounded-full border-2 ${btnColor(c)} ${
  //             selectedColor === c ? "border-white" : "border-transparent"
  //           }`}
  //         ></button>
  //       ))}
  //     </div>
  //   </div>
  // );

  // blue, pink, yellow, green 별 다른 text, graphic 적용

  const contentTextColor =
    selectedColor === "BLUE"
      ? "text-gray-3 text-body-2-med "
      : " text-body-2-med text-gray-10";

  //301 + 192 = 493
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
