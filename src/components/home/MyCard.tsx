"use client";

import { ArrowForwardIos } from "@mui/icons-material";
import StorageNameCard from "../StorageNameCard";
import { useRouter } from "next/navigation";
import { get, instance } from "@/src/apis";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useRouterWrapper } from "../Router/RouterWrapperProvider";

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
  const [cardInfo, setCardInfo] = useState<CardInfo>();

  const router = useRouterWrapper();

  const fetchCardInfo = async () => {
    const cardId = localStorage.getItem("cardId");

    try {
      const response = await get<AxiosResponse<CardInfo[]>>(`/api/cards`);
      const data = response.data.data[0];
      //console.log(response.data.data);
      setCardInfo(data);
    } catch (error) {
      console.error("명함 정보를 불러오는데 실패했습니다: ", error);
    }
  };

  useEffect(() => {
    fetchCardInfo();
  }, []);

  //console.log("cardInfo: ", cardInfo);

  return (
    <div className="my-[3.2rem] flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <div className="text-headline-3 text-black">
          {cardInfo?.name} 님의 명함
        </div>
        <div
          className="flex cursor-pointer items-center text-body-1-med text-gray-7"
          onClick={() => {
            router.push("/card?view=mine");
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
        {cardInfo ? (
          <StorageNameCard oneCard={cardInfo} />
        ) : (
          <div className="text-body-2-med text-gray-6">
            명함 정보를 불러오고 있습니다...
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCard;
