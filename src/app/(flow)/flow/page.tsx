"use client";

import { get } from "@/src/apis";
import AfterSelect from "@/src/components/flow/AfterSelect";
import BeforeSelect from "@/src/components/flow/BeforeSelect";
import { getUserData } from "@/src/utils";
import { useSearchParams } from "next/navigation";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import io  from "socket.io-client";

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

const Flow = () => {
  /* 
    /flow?roomId={roomId}  와 같은 주소에서 roomId 내용을 뽑아올거임
  */
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const user = getUserData();

  const [isHost, setIsHost] = useState(!!localStorage.getItem("isGameHost")); //방장 여부
  const [isReady, setIsReady] = useState(false);
  const [cardStep, setCardStep] = useState(0); //소켓으로 on 해올 예정 -> todo: 아마 현재 문제가 뭔지에 대해서...
  const [isBefore, setIsBefore] = useState(true); //소켓에서 현재 상태를 받아와서 대기 room으로 이동 여부 결정
  const [isGameEnd, setIsGameEnd] = useState(false);

  const socketRef = useRef<any>(null);

  useEffect(() => {
    //여기서 다시 연결
    socketRef.current = io("https://talkspark-dev-api.p-e.kr", {
      transports: ["websocket"],
    });

    //방에 잘 접속했다는 메세지 전송
    socketRef.current.emit("joinGame", { roomId, accessToken:  user?.accessToken});
    socketRef.current.on("gameJoined", (data) => { //현재 이거 안됨(메세지가 안옴)
      console.log(data); //데이터 없다고 하긴 함
      if (socketRef.current && isHost)
        socketRef.current.emit("prepareQuizzes", { roomId });

      setTimeout(() => {
        //3초 대기 후 진행
        setIsReady(true);
      }, 3000);
    });

    //todo: 명함 하나 공개, 전체 공개와 관련된 로직 구성하기
    socketRef.current.on("singleResult", (data) => {
      console.log(data);
    });
    socketRef.current.on("lastResult", (data) => {
      console.log(data);
    });

    //todo: 형식 변환될 가능성 있음. (요청해봄)
    //todo2: 이거 데이터 오면, 해당 데이터를 가지고 AfterSelect로 넘어가는 로직 필요 (아마 부모요소에서 배열을 세팅한다음, isBefore세팅해서 넘어가면 될 듯)
    socketRef.current.on(
      "singleQuestionScoreBoard",
      (data: NumberBooleanMap) => {
        const entries = Object.entries(data); // [key, value] 배열로 변환
        entries.forEach(([userId, isMatched]) => {
          if (isMatched) {
            console.log(`User ${userId} answered correctly.`);
          } else {
            console.log(`User ${userId} answered incorrectly.`);
          }
        });
      },
    );

    // 최종 스코어 가져오기
    socketRef.current.on("scores", (data) => {
      console.log(data);
      //data를 localStorage에 잘 저장해두었다가, /game-end 에서 사용하여 렌더링하도록 만들기.
      //그리고 참고로 초기화도 잘 해줘야함 (로컬 스토리지) -> 아 아닌가? 그냥 그때마다 set할거니까 상관 없을수도?
      setIsGameEnd(true);
    }); 

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null; //메모리 누수 방지
    };
  }, []);

  if (!roomId) return;
  //나중에 방장 여부 넘겨서, 버튼 활성화 여부 결정 필요
  return (
    <main className="flex flex-col items-center bg-gray-1">
      {isReady ? (
        socketRef && isBefore ? (
          <BeforeSelect
            cardStep={cardStep}
            setIsBefore={setIsBefore}
            setCardStep={setCardStep}
            socketRef={socketRef as MutableRefObject<any>}
            roomId={roomId}
            isHost={isHost}
          />
        ) : (
          <AfterSelect
            cardStep={cardStep}
            setIsBefore={setIsBefore}
            socketRef={socketRef as MutableRefObject<any>}
            roomId={roomId}
            isHost={isHost}
            isGameEnd={isGameEnd}
          />
        )
      ) : (
        <div>로딩중.. 3초만 기다려주세요</div>
      )}
    </main>
  );
};

export default Flow;
