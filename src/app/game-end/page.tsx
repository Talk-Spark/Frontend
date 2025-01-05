"use client";

import BarGraph from "@/src/components/game-end/BarGraph";
import RankingSheet from "@/src/components/game-end/RankingSheet";
import React, { useEffect, useState } from "react";
import { FinalPeopleProps } from "../(flow)/flow/page";
import Header from "@/src/components/Headers/Header";
import { useRouter } from "next/navigation";

export interface Player {
  name: string;
  score: number;
}

const DUMMY_DATA: Player[] = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 82 },
  { name: "Charlie", score: 92 },
  { name: "David", score: 78 },
  { name: "Eve", score: 88 },
];

export const getDataFromLocalStorage = (key : string) => {
  const data = localStorage.getItem(key); // localStorage에서 데이터를 가져옴
  if (data) {
    try {
      return JSON.parse(data); // JSON으로 파싱하여 반환
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
      return null; // 파싱 실패 시 null 반환
    }
  }
  return null; // 데이터가 없으면 null 반환
};

export default function GameEnd() {
  const router = useRouter();
  const [finalData, setFinalData] = useState<Player[] | null>(null);

  useEffect(()=>{
    const finalPeople = getDataFromLocalStorage("finalPeople");
    const finalScores = getDataFromLocalStorage("finalScores");

    // 로직
    if (finalPeople && finalScores) {
      const finalData: Player[] = (finalPeople as FinalPeopleProps[])
      .filter(person => finalScores[person.ownerId] !== undefined) // 점수가 있는 사람만 매칭
      .map(person => ({
        name: person.name,
        score: finalScores[person.ownerId],
      }));

      console.log(finalData);
      setFinalData(finalData);    
    }
    
  },[])
  
  if(!finalData) return;

  //todo: 실제로 받아온 정보로 나중에는 슬라이싱해서 ranking sheet에 넘기기.
  const sortedPlayers = finalData.sort((a, b) => b.score - a.score);
  const otherPlayers = finalData.length >= 4 ? sortedPlayers.slice(3) : [];

  return (
    <>
      <Header title="최종 스코어" button2Type="next" button2Action={()=>{router.push("/all-cards")}}/>
      <BarGraph players={finalData} />
      <RankingSheet otherPlayers={otherPlayers} />
    </>
  );
}
