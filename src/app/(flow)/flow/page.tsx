"use client";

import { get } from "@/src/apis";
import AfterSelect from "@/src/components/flow/AfterSelect";
import BeforeSelect from "@/src/components/flow/BeforeSelect";
import Header from "@/src/components/Headers/Header";
import { getUserData } from "@/src/utils";
import { useSearchParams } from "next/navigation";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import io  from "socket.io-client";

// export const CARD_FLOW = [
//   "엠비티아이",
//   "취미",
//   "닮은꼴",
//   "나는 이런 사람이야",
//   "TMI",
// ] as const;
// export type CardFlowType = (typeof CARD_FLOW)[number];

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

export interface singleQuestionObjProps {
  sparkUserId: number;
  correct : boolean;
  color: "PINK" | "MINT" | "YELLOW" | "BLUE";
  name : string;
}

export type FieldType = "mbti" | "hobby" | "lookAlike" | "selfDescription" | "tmi";

//question으로 받아오는 1번째 데이터 타입
interface UserProfile {
  id: number; // 사용자 카드의 고유 ID
  ownerId: number; // 소유자 ID (sparkUserId)
  name: string; // 이름
  age: number; // 나이
  kakaoId: string; // 카카오톡 ID
  major: string; // 전공
  mbti: string; // MBTI
  hobby: string; // 취미
  lookAlike: string; // 닮은 꼴
  selfDescription: string; // 자기소개
  tmi: string; // TMI
  cardThema: string; // 카드 테마 색상
}

//question으로 받아오는 2번째 데이터 타입
interface UserBlanks {
  sparkUserId: number; // 사용자 ID
  blanks: FieldType[]; // 빈 필드 목록 - 남아있는 문제들이 올거임
}

//question으로 받아오는 3번째 데이터 타입
export interface QuizDataProps {
  cardId: number; // 명함 아이디
  cardOwnerId: number; // 명함 주인 회원아이디
  fieldName: FieldType; // 빈칸으로 뚫릴 필드의 이름 (ex: "name", "age") -> mbti, hobby, lookAlike, selfDescription ,tmi
  correctAnswer: string; // 정답(보기 번호가 아니고 정답 내용이 들어갑니다. 문제 종류 관계없이 string입니다.)
  options: string[]; //정답 보기들(아마 4개)
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
  const [correctedPeople, setCorrectedPeople] = useState<singleQuestionObjProps[] | null>(null);

  //소켓에서 받아오는 정보들
  const [NameCardInfo, setNameCardInfo] = useState<NameCardObjProps>({
      //더미데이터
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
    const [quizInfo, setQuizInfo] = useState<QuizDataProps | null>(null);
    const [fieldHoles, setFieldHoles] = useState<FieldType[] | null>(null);
  

  const socketRef = useRef<any>(null);

  useEffect(() => {
    //여기서 다시 연결
    socketRef.current = io("https://talkspark-dev-api.p-e.kr", {
      transports: ["websocket"],
    });

    //방에 잘 접속했다는 메세지 전송
    socketRef.current.emit("joinGame", { roomId, accessToken:  user?.accessToken});
    socketRef.current.on("gameJoined", () => { 
      if (socketRef.current && isHost)
        socketRef.current.emit("prepareQuizzes", { roomId });

      setTimeout(() => {
        setIsReady(true);
      }, 3000); //3초 대기 후 진행

    });

    //todo: 명함 하나 공개, 전체 공개와 관련된 로직 구성하기
    socketRef.current.on("singleResult", (data : any) => {
      console.log(data);
    });
    socketRef.current.on("lastResult", (data : any) => {
      console.log(data);
    });

    //todo: 근데 생각해보니까, 이것도 상위에서 받아서 넘겨야할 듯(그래야 자식 요소에서 컨트롤 가능)
    socketRef.current.on("question", (profileData : UserProfile, blankData : UserBlanks, QuizData: QuizDataProps, teamName: string) => {
      
      setNameCardInfo({
        teamName: teamName, 
        name: profileData.name,
        age: profileData.age,
        major: profileData.major,
        mbti: profileData.mbti,
        hobby: profileData.hobby,
        lookAlike: profileData.lookAlike,
        selfDescription: profileData.selfDescription, 
        tmi: profileData.tmi,
      });
      setQuizInfo(QuizData);
      setFieldHoles(blankData.blanks);
    });

    //todo: 형식 변환될 가능성 있음. (요청해봄)
    //todo2: 이거 데이터 오면, 해당 데이터를 가지고 AfterSelect로 넘어가는 로직 필요 (아마 부모요소에서 배열을 세팅한다음, isBefore세팅해서 넘어가면 될 듯)
    socketRef.current.on(
      "singleQuestionScoreBoard",
      (data: singleQuestionObjProps[]) => {
        setCorrectedPeople(data as singleQuestionObjProps[]);
        setIsBefore(false);
      },
    );

    // 최종 스코어 가져오기
    socketRef.current.on("scores", (data : any) => {
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
    <>
    <Header title="명함 맞추기"/>
      <main className="flex flex-col items-center bg-gray-1 w-[cal(100% + 4rem)] -mx-[2rem] h-[71.2rem]">
      {isReady ? (
        socketRef && isBefore ? (
          <BeforeSelect
            cardStep={cardStep}
            setIsBefore={setIsBefore}
            setCardStep={setCardStep}
            socketRef={socketRef as MutableRefObject<any>}
            roomId={roomId}
            isHost={isHost}
            NameCardInfo ={NameCardInfo}
            quizInfo ={quizInfo as QuizDataProps}
            fieldHoles ={fieldHoles as FieldType[]}

          />
        ) : (
          <AfterSelect
            cardStep={cardStep}
            setIsBefore={setIsBefore}
            socketRef={socketRef as MutableRefObject<any>}
            roomId={roomId}
            isHost={isHost}
            isGameEnd={isGameEnd}
            correctedPeople = {correctedPeople as singleQuestionObjProps[]}
            answer = {quizInfo?.correctAnswer as string}
            answerCount = {correctedPeople?.length as number}
          />
        )
      ) : (
        <div>로딩중.. 3초만 기다려주세요</div>
      )}
    </main>
    </>

  );
};

export default Flow;
