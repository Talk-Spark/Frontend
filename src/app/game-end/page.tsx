"use client";

import BarGraph from "@/src/components/game-end/BarGraph";
import RankingSheet from "@/src/components/game-end/RankingSheet";
import React, { useEffect, useState } from "react";

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

export default function GameEnd() {
  const [finalData, setFinalData] = useState<any>();
  useEffect(()=>{
    const finalScores = JSON.parse(localStorage.getItem("finalScores") || "");
  if(finalScores){
    //finalData를 나중에 적절히 조작해야함(슬라이싱등)
    setFinalData(finalScores);    
  }
  },[])
  
  //todo: 실제로 받아온 정보로 나중에는 슬라이싱해서 ranking sheet에 넘기기.
  const sortedPlayers = DUMMY_DATA.sort((a, b) => b.score - a.score);
  const otherPlayers = DUMMY_DATA.length >= 4 ? sortedPlayers.slice(3) : [];

  return (
    <>
      <BarGraph players={DUMMY_DATA} />
      <RankingSheet otherPlayers={otherPlayers} />
    </>
  );
}
