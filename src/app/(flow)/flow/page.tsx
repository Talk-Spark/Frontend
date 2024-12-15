"use client";

import AfterSelect from "@/src/components/flow/AfterSelect";
import BeforeSelect from "@/src/components/flow/BeforeSelect";
import { useState } from "react";

export interface NameCardObjProps {
  teamName: string;
  name: string;
  age: number;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  selfDescription: string;
  tmi: string;
}

const Flow = () => {
  const [cardStep, setCardStep] = useState("TMI"); //소켓으로 on 해올 예정
  const [isBefore, setIsBefore] = useState(true); //소켓에서 현재 상태를 받아와서 대기 room으로 이동 여부 결정
  const [isMaker, setIsMaker] = useState(false); //소켓 or API로 방장 여부 받아오기
  const [NameCardInfo, setNameCardInfo] = useState<NameCardObjProps>({
    //이것도 현재 대상자 정보를 소켓으로 받아와야할 듯
    teamName: "팀 이름 없음",
    name: "JunHyuk Kong",
    age: 18,
    major: "컴퓨터공학과",
    mbti: "INTJ",
    hobby: "축구",
    lookAlike: "강동원",
    selfDescription: "안녕하세요 저는 공준혁이라고 합니다",
    tmi: "카페인이 너무 잘 들어요",
  });

  return (
    <main className="flex flex-col items-center bg-gray-1">
      {isBefore ? (
        <BeforeSelect
          cardStep={cardStep}
          NameCardInfo={NameCardInfo}
          setIsBefore={setIsBefore}
        />
      ) : (
        <AfterSelect />
      )}
    </main>
  );
};

export default Flow;
