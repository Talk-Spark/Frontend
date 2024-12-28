"use client";

import { ArrowForwardIos } from "@mui/icons-material";
import StorageNameCard from "../StorageNameCard";
import { useRouter } from "next/navigation";

const MyCard = () => {
  // 예시 데이터
  const cardInfo = {
    cardId: 1,
    teamName: "톡스파크",
    name: "이름이름",
    age: 23,
    major: "컴퓨터공학",
    color: "blue" as "pink" | "green" | "yellow" | "blue",
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
        <StorageNameCard {...cardInfo} />
      </div>
    </div>
  );
};

export default MyCard;
