"use client";

import BarGraph from "@/src/components/game-end/BarGraph";
import React from "react";

interface Player {
  name: string;
  score: number;
}

const DUMMY_DATA: Player[] = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 87 },
  { name: "Charlie", score: 92 },
  { name: "David", score: 78 },
  { name: "Eve", score: 88 },
];

export default function GameEnd() {
  return <BarGraph players={DUMMY_DATA} />;
}
