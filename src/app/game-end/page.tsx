"use client";

import BarGraph from "@/src/components/game-end/BarGraph";
import RankingSheet from "@/src/components/game-end/RankingSheet";
import React, { useState } from "react";

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
  const finalScores = JSON.parse(localStorage.getItem("finalScores") || "");
  if(finalScores){
    //여기서 적당히 슬라이싱, 등등 해서 적당히 넘기기
  }
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
