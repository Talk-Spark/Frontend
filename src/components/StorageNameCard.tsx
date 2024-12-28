"use client";
import React, { useEffect, useState } from "react";
import whiteMajorIcon from "@/public/storageNameCard/blueMajorIcon.svg";
import pinkMajorIcon from "@/public/storageNameCard/pinkMajorIcon.svg";
import blackMajorIcon from "@/public/storageNameCard/blackMajorIcon.svg";

import Image, { StaticImageData } from "next/image";
import whitePencil from "@/public/storageNameCard/pencil.svg";
import blackPencil from "@/public/storageNameCard/blackPencil.svg";
import pinkGraphic from "@/public/storageNameCard/pinkGraphics.svg";
import greenGraphic from "@/public/storageNameCard/greenGraphics.svg";
import blueGraphic from "@/public/storageNameCard/blueGraphics.svg";
import yellowGraphic from "@/public/storageNameCard/yellowGraphics.svg";
import QrcodeDown from "./QrCode/QrCodeDown";
import { instance } from "../apis";

type NameCardProps = {
  id?: number; // 내 명함에만
  kakaoId?: string;
  ownerId?: number;

  teamName?: string; // 보관함에서만
  storedCardId?: number;

  name: string;
  age: number;
  major: string;
  mbti?: string;
  hobby?: string;
  lookAlike?: string;
  slogan?: string;
  tmi?: string;
  cardThema?: "PINK" | "MINT" | "YELLOW" | "BLUE";
  isFull?: boolean;
  isStorage?: boolean;
};

const graphicColor: Record<string, StaticImageData> = {
  PINK: pinkGraphic,
  MINT: greenGraphic,
  YELLOW: yellowGraphic,
  BLUE: blueGraphic,
};

const StorageNameCard: React.FC<NameCardProps> = ({
  ownerId = 1,
  name = "",
  age = 1,
  major = "",
  mbti = "",
  hobby = "",
  lookAlike = "",
  slogan = "",
  tmi = "",
  cardThema = "PINK",
  isFull = false,
  isStorage = false,
}) => {
  // 초기 색상 설정 (이 코드 없으면 selectedColor PINK로 고정됨)
  useEffect(() => {
    setSelectedColor(cardThema);
  }, [cardThema]);

  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [selectedColor, setSelectedColor] = useState(cardThema); // 색상 상태
  const putData = {
    sparkUserId: ownerId,
    name,
    age,
    major,
    mbti,
    hobby,
    lookAlike,
    slogan,
    tmi,
    cardThema,
  };

  const qrData = {
    // 큐알 다운로드 위한 객체
    cardId: ownerId,
    name: name,
  };

  const handleEditToggle = async () => {
    try {
      await instance.put(`/api/cards/${ownerId}`, {
        ...putData,
        cardThema: selectedColor,
      });
      setIsEditing((prev) => !prev); // 편집 상태 토글
    } catch (e) {
      console.log(e);
    }
  };

  const handleColorChange = (newColor: "PINK" | "MINT" | "YELLOW" | "BLUE") => {
    setSelectedColor(newColor); // 색상 변경만 처리
  };

  // 편집 모드일 때 렌더링되는 색상 변경 UI
  const renderColorChangeButtons = () => (
    <div className="absolute right-[2.8rem] top-[3.2rem] flex flex-col gap-[1.6rem]">
      <button
        onClick={handleEditToggle}
        className={`rounded-lg ${completeBtn}`}
      >
        완료
      </button>
      <div className="flex w-full flex-col items-center justify-around gap-[1.4rem]">
        {(["PINK", "YELLOW", "MINT", "BLUE"] as const).map((c) => (
          <button
            key={c}
            onClick={() => handleColorChange(c)}
            className={`h-[2.8rem] w-[2.8rem] rounded-full border-2 ${btnColor(c)} ${
              selectedColor === c ? "border-white" : "border-transparent"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );

  const backColorTop: Record<string, string> = {
    PINK: "bg-gradient-to-b from-[#FFCCE1] to-[#FFA6CA]",
    MINT: "bg-gradient-to-b from-[#BBFFF3] to-[#66F5DC]",
    YELLOW: "bg-gradient-to-b from-[#FFEFB7] to-[#FEE485]",
    BLUE: "bg-gradient-to-b from-[#9CACFF] to-[#6D86F5]",
  };
  const backColorBottom: Record<string, string> = {
    PINK: "bg-gradient-to-b from-[#FFA6CA] to-[#FF80B4]",
    MINT: "bg-gradient-to-b from-[#66F5DC] to-[#11EBC5]",
    YELLOW: "bg-gradient-to-b from-[#FEE485] to-[#FDD853]",
    BLUE: "bg-gradient-to-b from-[#6D86F5] to-[#3D5BF5]",
  };

  // blue, pink, yellow, green 별 다른 text, graphic 적용
  const graphicImageUrl = graphicColor[selectedColor] || graphicColor.pink;
  const pencilImageUrl = selectedColor === "BLUE" ? whitePencil : blackPencil;
  const majorImageUrl =
    selectedColor === "BLUE"
      ? whiteMajorIcon
      : selectedColor === "PINK"
        ? pinkMajorIcon
        : blackMajorIcon;
  const mbtiColor =
    selectedColor === "BLUE"
      ? "text-sub-blue"
      : selectedColor === "PINK"
        ? "text-main-pink"
        : "text-gray-12";
  const contentTextColor =
    selectedColor === "BLUE"
      ? "text-gray-3 text-body-2-med "
      : " text-body-2-med text-gray-10";

  const categoryColor =
    selectedColor === "BLUE"
      ? "text-body-2-bold text-white"
      : " text-body-2-bold text-gray-12";
  const completeBtn =
    selectedColor === "BLUE"
      ? "text-body-1-bold text-gray-1"
      : "text-body-1-bold text-gray-11";

  const nameTextColor = selectedColor === "BLUE" ? "text-white" : "text-black";

  const btnColor = (c: string) =>
    c === "PINK"
      ? "bg-sub-pink"
      : c === "YELLOW"
        ? "bg-sub-yellow"
        : c === "MINT"
          ? "bg-sub-mint"
          : "bg-sub-blue";

  //301 + 192 = 493
  return (
    <div
      className={`relative ${isFull ? "h-[49.3rem]" : "h-[30.1rem]"} w-[33.5rem] rounded-[2rem]`}
    >
      {/* 첫 번째 사각형 - 상단 */}
      <div className="">
        <div className="">
          <div
            className={`"flex flex-col gap-[0.4rem] rounded-[2rem] px-[2.8rem] pt-[2.4rem] ${backColorTop[selectedColor]}`}
          >
            <div className="flex h-[4.1rem] justify-between gap-[7rem]">
              <div
                className={`flex items-center gap-[1.2rem] ${nameTextColor}`}
              >
                <span className="text-headline-2">{name}</span>
                <span className="text-subhead-med">{age}세</span>
              </div>
              <div className="flex h-[4.1rem] gap-[1.2rem]">
                {isFull &&
                  (!isEditing ? (
                    <>
                      {isStorage && (
                        <button onClick={handleEditToggle}>
                          <Image
                            src={pencilImageUrl}
                            alt="편집 아이콘"
                            width={24}
                            height={24}
                            className="mb-[1.7rem] cursor-pointer"
                          />
                        </button>
                      )}
                      <button>
                        <QrcodeDown
                          selectedColor={selectedColor}
                          qrData={qrData}
                        />
                      </button>
                    </>
                  ) : (
                    renderColorChangeButtons()
                  ))}
              </div>
            </div>
            <div className="mb-[1.8rem] flex gap-[1.2rem]">
              <div className="flex items-center gap-[0.4rem]">
                <Image
                  src={majorImageUrl}
                  alt="전공 아이콘"
                  width={24}
                  height={24}
                />
                <div className={`text-body-2-med ${nameTextColor}`}>
                  {major}
                </div>
              </div>
              <div className="flex items-center gap-[0.4rem]">
                <div className={`text-body-2-bold ${mbtiColor}`}>
                  {mbti ? "MBTI" : ""}
                </div>
                <div className={` ${contentTextColor}`}>{mbti}</div>
              </div>
            </div>
            <Image src={graphicImageUrl} alt="그래픽 이미지" />
          </div>
        </div>
        {/* 두 번째 사각형 - 하단 */}
        {isFull && (
          <div
            className={`flex h-[19.2rem] gap-[2.7rem] rounded-[20px] px-[2.8rem] py-[2.4rem] ${backColorBottom[selectedColor]}`}
          >
            <div className="flex flex-1 flex-col gap-[1.6rem]">
              <div className="flex flex-1 flex-col gap-[0.4rem]">
                <span className={`${categoryColor}`}>취미</span>
                <p className={` ${contentTextColor}`}>{hobby}</p>
              </div>
              <div className="flex flex-1 flex-col gap-[0.4rem]">
                <span className={`${categoryColor}`}>TMI</span>
                <p className={` ${contentTextColor}`}>{tmi}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-[1.6rem]">
              <div className="flex flex-1 flex-col gap-[0.4rem]">
                <span className={`${categoryColor}`}>닮은 꼴</span>
                <p className={` ${contentTextColor}`}>{lookAlike}</p>
              </div>
              <div className="flex flex-1 flex-col gap-[0.4rem]">
                <span className={`${categoryColor}`}>나는 이런 사람이야</span>
                <p className={` ${contentTextColor}`}>{slogan}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageNameCard;
