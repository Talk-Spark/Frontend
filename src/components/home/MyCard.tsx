"use client";

import { ArrowForwardIos } from "@mui/icons-material";
import StorageNameCard from "../StorageNameCard";
import { useRouter } from "next/navigation";

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
  ownerId: number;
};

const MyCard = () => {
  // 예시 데이터
  const cardInfo: MyNameCardProps = {
    id: 1,
    kakaoId: "exampleKakaoId",
    ownerId: 123,
    name: "이름이름",
    age: 23,
    major: "컴퓨터공학",
    color: "BLUE" as "PINK" | "MINT" | "YELLOW" | "BLUE",
  };

  const router = useRouter();

  const cardId = localStorage.getItem("cardId");

  // todo: cardId로 내 명함 정보 가져오기

  return (
    <div className="my-[3.2rem] flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <div className="text-headline-3 text-black">이름이름 님의 명함</div>
        <div
          className="flex items-center text-body-1-med text-gray-7"
          onClick={() => {
            router.push("/card");
          }}
        >
          내 명함
          <ArrowForwardIos
            style={{ fontSize: "2.2rem" }}
            className="text-gray-7"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <StorageNameCard oneCard={cardInfo} />
      </div>
    </div>
  );
};

export default MyCard;
