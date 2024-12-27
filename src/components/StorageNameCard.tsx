"use client";
import React, { useState } from "react";
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
import CardDetailData from "./Storage/card/CardDataDetail";
import CardDataDetail from "./Storage/card/CardDataDetail";
import { yellow } from "@mui/material/colors";

/* 
1. 뒷면 그래픽 위치 조정
2. 명함 수정하기 PUT
3. 애니메이션 수정(시간 되면)
*/

// type NameCardProps = {
//   oneCard: CardData
//   id?: number; // 내 명함에만 id = cardID
//   kakaoId?: string;
//   ownerId?: number;
//   isEditing?: boolean;
//   setIsEditing?: (value: boolean) => void;

//   teamName?: string; // 보관함에서만
//   storedCardId?: number; // 보관된 명함 개별 조회 팀원들 Id = storedCardId

//   name: string;
//   age: number;
//   major: string;
//   mbti?: string;
//   hobby?: string;
//   lookAlike?: string;
//   slogan?: string;
//   tmi?: string;
//   cardThema: "pink" | "green" | "yellow" | "blue";
//   isFull?: boolean;
//   isStorage?: boolean;
// };

const graphicColor: Record<string, StaticImageData> = {
  pink: pinkGraphic,
  green: greenGraphic,
  yellow: yellowGraphic,
  blue: blueGraphic,
};

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
  cardThema: "pink" | "green" | "yellow" | "blue";
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
};

const StorageNameCard: React.FC<NameCardProps> = ({
  oneCard,
  isFull = false,
  isStorage = false,
  isEditing,
  setIsEditing,
}) => {
  // const [selectedColor, setSelectedColor] = useState(oneCard.cardThema); // 색상 상태
  const [putData, setPutData] = useState<PutCardProps>({
    sparkUserId: oneCard.ownerId,
    ...oneCard,
  });
  const selectedColor = putData ? putData.cardThema : oneCard.cardThema;

  // const qrData = {
  //   // 큐알 다운로드 위한 객체
  //   cardId: id, // 명함 ID
  //   name: name,
  // };

  const handleEditToggle = async () => {
    if (setIsEditing) {
      if (isEditing) {
        try {
          await instance.put(`/api/cards/${oneCard.ownerId}`, {
            ...putData,
            cardThema: putData.cardThema,
          });
        } catch (e) {
          console.log(e);
        }
      }
      setIsEditing(!isEditing); // 편집 상태 토글
    }
  };

  const handleColorChange = (
    newColor: "pink" | "green" | "yellow" | "blue",
  ) => {
    setPutData({ ...putData, cardThema: newColor }); // 색상 변경만 처리
    // 색상 변경
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
        {(["pink", "yellow", "green", "blue"] as const).map((c) => (
          <button
            key={c}
            onClick={() => handleColorChange(c)}
            className={`h-[2.8rem] w-[2.8rem] rounded-full border-2 ${btnColor[c]} ${
              putData?.cardThema === c ? "border-white" : "border-transparent"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );

  const backColorTop: Record<string, string> = {
    pink: "bg-gradient-to-b from-[#FFCCE1] to-[#FFA6CA]",
    green: "bg-gradient-to-b from-[#BBFFF3] to-[#66F5DC]",
    yellow: "bg-gradient-to-b from-[#FFEFB7] to-[#FEE485]",
    blue: "bg-gradient-to-b from-[#9CACFF] to-[#6D86F5]",
  };

  const backColorBottom: Record<string, string> = {
    pink: "bg-gradient-to-b from-[#FFA6CA] to-[#FF80B4]",
    green: "bg-gradient-to-b from-[#66F5DC] to-[#11EBC5]",
    yellow: "bg-gradient-to-b from-[#FEE485] to-[#FDD853]",
    blue: "bg-gradient-to-b from-[#6D86F5] to-[#3D5BF5]",
  };

  // blue, pink, yellow, green 별 다른 text, graphic 적용
  const graphicImageUrl = graphicColor[selectedColor] || graphicColor.pink;
  const pencilImageUrl = selectedColor === "blue" ? whitePencil : blackPencil;
  const majorImageUrl =
    selectedColor === "blue"
      ? whiteMajorIcon
      : selectedColor === "pink"
        ? pinkMajorIcon
        : blackMajorIcon;
  const mbtiColor =
    selectedColor === "blue"
      ? "text-sub-blue"
      : selectedColor === "pink"
        ? "text-main-pink"
        : "text-gray-12";
  const contentTextColor =
    selectedColor === "blue"
      ? "text-gray-3 text-body-2-med"
      : " text-body-2-med text-gray-10";

  const completeBtn =
    selectedColor === "blue"
      ? "text-body-1-bold text-gray-1"
      : "text-body-1-bold text-gray-11";

  const nameTextColor = selectedColor === "blue" ? "text-white" : "text-black";

  const btnColor = {
    pink: "bg-sub-pink",
    yellow: "bg-sub-yellow",
    green: "bg-sub-mint",
    blue: "bg-sub-blue",
  };

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
                <span className="text-headline-2">{oneCard.name}</span>
                <span className="text-subhead-med">{oneCard.age}세</span>
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
                        {/* <QrcodeDown
                          selectedColor={putData.cardThema}
                          qrData={qrData}
                        /> */}
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
                  {oneCard.major}
                </div>
              </div>
              <div className="flex items-center gap-[0.4rem]">
                <div className={`text-body-2-bold ${mbtiColor}`}>
                  {oneCard.mbti ? "MBTI" : ""}
                </div>
                <div className={contentTextColor}>{oneCard.mbti}</div>
              </div>
            </div>
            <Image src={graphicImageUrl} alt="그래픽 이미지" />
          </div>
        </div>
        {/* 두 번째 사각형 - 하단 */}
        {isFull && (
          <CardDataDetail
            oneCard={oneCard}
            putData={putData}
            setPutData={setPutData}
            contentTextColor={contentTextColor}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
};

export default StorageNameCard;
