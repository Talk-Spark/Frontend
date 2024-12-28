"use client";

import { ArrowForwardIos } from "@mui/icons-material";
import StorageNameCard from "../StorageNameCard";
import { useRouter } from "next/navigation";
import { instance } from "@/src/apis";
import { useEffect, useState } from "react";

interface CardInfo {
  id: number;
  kakaoId: string;
  name: string;
  age: number;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  slogan: string;
  tmi: string;
  ownerId: number;
  cardThema: "PINK" | "MINT" | "YELLOW" | "BLUE";
}

const MyCard = () => {
  const [cardInfo, setCardInfo] = useState<CardInfo>();

  const router = useRouter();

  const fetchCardInfo = async () => {
    const cardId = localStorage.getItem("cardId");

    try {
      const response = await instance(`/api/cards/${cardId}`);
      const data = response.data.data;
      setCardInfo(data);
      console.log("data: ", data);
    } catch (error) {
      console.error("명함 정보를 불러오는데 실패했습니다: ", error);
    }
  };

  useEffect(() => {
    fetchCardInfo();
  }, []);

  return (
    <div className="my-[3.2rem] flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <div className="text-headline-3 text-black">
          {cardInfo?.name} 님의 명함
        </div>
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
