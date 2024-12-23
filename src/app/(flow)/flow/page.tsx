"use client";

import AfterSelect from "@/src/components/flow/AfterSelect";
import BeforeSelect from "@/src/components/flow/BeforeSelect";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const CARD_FLOW = [
  "엠비티아이",
  "취미",
  "닮은꼴",
  "나는 이런 사람이야",
  "TMI",
] as const;
export type CardFlowType = (typeof CARD_FLOW)[number];

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
/*
  방에 입장했을 때 소켓 연결 및 joinRoom 메세지 전송
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("https://talkspark-dev-api.p-e.kr/socket.io/", {
      transports: ["websocket"],
    });

    //이 2가지 과정은 적절하게 위치 옮길 필요 존재.
    socketRef.current.emit("joinRoom", { roomId, accessToken, isHost });
    socketRef.current.on("roomUpdate", (info) => {
      //info 객체를 가지고 적절한 동작 수행! (방을 세팅하는)
    });

    //그리고 방장 여부는 받아오기
    get("/api/rooms/host");

    //방 퇴장 시
    socketRef.current.emit("leaveRoom", { roomId, accessToken, isHost });
    socketRef.current.disconnect();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
*/

const Flow = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("https://talkspark-dev-api.p-e.kr/socket.io/", {
      transports: ["websocket"],
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const [cardStep, setCardStep] = useState(0); //소켓으로 on 해올 예정
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

  //나중에 방장 여부 넘겨서, 버튼 활성화 여부 결정 필요
  return (
    <main className="flex flex-col items-center bg-gray-1">
      {isBefore ? (
        <BeforeSelect
          cardStep={cardStep}
          NameCardInfo={NameCardInfo}
          setIsBefore={setIsBefore}
          setCardStep={setCardStep}
        />
      ) : (
        <AfterSelect cardStep={cardStep} setIsBefore={setIsBefore} />
      )}
    </main>
  );
};

export default Flow;
