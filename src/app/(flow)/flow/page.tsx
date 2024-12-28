"use client";

import { get } from "@/src/apis";
import AfterSelect from "@/src/components/flow/AfterSelect";
import BeforeSelect from "@/src/components/flow/BeforeSelect";
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
      {
        "name": "사람이름",
        "isOwner": false // 방장이면 true, 아니면 false
        "userId" //아마 이것도 추가로 넘겨준다고 했음
      },
      ...
    });

    //그리고 방장 여부는 받아오기
    get("/api/rooms/host");

    //방 퇴장 시
    socketRef.current.emit("leaveRoom", { roomId, accessToken, isHost });
    socketRef.current.disconnect();

    //(only 방장) 게임 시작 버튼
  const handleStartGame = (roomId: string) => {
    socketRef.current?.emit("startGame", { roomId });
  };

  socketRef.current?.on("startGame", () => {
    //startGame을 보내고, 그에 대한 응답이 왔을 시 flow로 넘어가는 로직
    router.push("/flow/방아이디 어쩌구")
  });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
*/

const Flow = () => {
  /* 
    /flow?roomId={roomId}  와 같은 주소에서 roomId 내용을 뽑아올거임
  */
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [isHost, setIsHost] = useState(false); //방장 여부
  const [isReady, setIsReady] = useState(false);
  const [cardStep, setCardStep] = useState(0); //소켓으로 on 해올 예정
  const [isBefore, setIsBefore] = useState(true); //소켓에서 현재 상태를 받아와서 대기 room으로 이동 여부 결정

  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io("https://talkspark-dev-api.p-e.kr/socket.io/", {
      transports: ["websocket"],
    });

    const isHostCheck = async () => {
      const response = await get("/api/rooms/host");
      console.log(response.data);
      setIsHost(response.data as boolean);
    };

    isHostCheck();

    //방에 잘 접속했다는 메세지 전송
    socketRef.current.emit("joinGame", { roomId });
    socketRef.current.on("gameJoined", () => {
      if (socketRef.current && isHost)
        socketRef.current.emit("prepareQuizzes", { roomId });
      setTimeout(() => {
        //3초 대기 후 진행
        setIsReady(true);
      }, 3000);
    });

    //todo: 명함 하나 공개, 전체 공개와 관련된 로직 구성하기
    socketRef.current.on("singleResult", () => {});
    socketRef.current.on("lastResult", () => {});

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
          />
        )
      ) : (
        <div>로딩중.. 3초만 기다려주세요</div>
      )}
    </main>
  );
};

export default Flow;
