"use client";

import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ProfileImage from "../ProfileImage";
import Button from "@/src/components/common/Button";
import Lottie from "lottie-react";
import animationData from "@/public/flow/allCorrect.json";
import StorageNameCard from "../StorageNameCard";
import { useRouter } from "next/navigation";
import { singleQuestionObjProps } from "@/src/app/(flow)/flow/page";

const STORAGE_CARD = {
  teamName: "팀이름없어용",
  name: "공준혁",
  age: 26,
  major: "컴퓨터공학과",
  mbti: "intj",
  hobby: "운동",
  lookAlike: "강동원",
  selfDescription: "저는 아무 생각이 없는 사람입니당나귀",
  tmi: "티엠아이입니다 하하 티엠아이 딱히 없어요",
  color: "yellow" as const,
  isFull: true,
  isStorage: false,
};

interface AfterSelectProps {
  cardStep: number;
  setIsBefore: Dispatch<SetStateAction<boolean>>;
  socketRef: MutableRefObject<any>;
  roomId: string;
  isHost: boolean;
  isGameEnd :boolean;
  correctedPeople : singleQuestionObjProps[];
  answer : string;
  answerCount : number;
}
const AfterSelect = ({
  cardStep,
  setIsBefore,
  socketRef,
  roomId,
  isHost,
  isGameEnd,
  correctedPeople,
  answer,
  answerCount 
}: AfterSelectProps) => {
  //해당 state들은 전부 소켓으로 받아올 필요성 존재
  const [isAllCorrect, setIsAllCorrect] = useState(true);
  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const router = useRouter();

  //todo: key가 string일 수 있음 (userId : 맞춤 여부) 형식이기 때문!
  type NumberBooleanMap = {
    [key: number]: boolean;
  };

  const handleNextQuestion = () => {
    if (cardStep <= 4) setIsBefore(true);
    else setIsQuizEnd(true); //개인 카드 공개
  };

  const handleNextPerson = () => {
    socketRef.current.emit("next", { roomId });
   
    if (isGameEnd) { //게임 종료 여부는 부모 요소로부터 받아옴(on으로)
      router.push("/game-end"); //최종스코어 창으로 이동!
    } else {
      //맞출 사람이 더 남았을 경우 - 초기화 작업
      setIsBefore(true);
      setIsAllCorrect(false);
      setIsQuizEnd(false);
    }
  };

  //전부 다 맞췄을 때 로띠 뜨는 것도 구현 필요 + 방장만 클릭 가능한 거 많음.
  return (
    <>
      {isQuizEnd ? (
        <>
          <section className="mt-[2.4rem] flex flex-col items-center gap-[2rem] self-stretch">
            <span className="text-center text-headline-3 text-black">
              공준혁님의 명함 완성!
            </span>
            <StorageNameCard
              teamName={STORAGE_CARD.teamName}
              name={STORAGE_CARD.name}
              age={STORAGE_CARD.age}
              major={STORAGE_CARD.major}
              mbti={STORAGE_CARD.mbti}
              hobby={STORAGE_CARD.hobby}
              lookAlike={STORAGE_CARD.lookAlike}
              slogan={STORAGE_CARD.selfDescription}
              tmi={STORAGE_CARD.tmi}
              cardThema={STORAGE_CARD.color}
              isFull={STORAGE_CARD.isFull}
              isStorage={STORAGE_CARD.isStorage}
            />
          </section>

          <div className="mb-[6rem] mt-[2.4rem]">
            <Button
              onClick={handleNextPerson}
              variant={isGameEnd ? "pink" : "black"}
              disabled={!isGameEnd && !isHost}
            >
              {isGameEnd ? "최종 스코어 보기" : "다음 사람 맞추기"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <section className="relative flex h-auto w-[37.5rem] flex-col items-center justify-start gap-[2.4rem] pt-[2.4rem]">
            <article className="flex w-[33.5rem] flex-col items-center gap-[3.6rem]">
              <div className="br-[1.2rem] flex flex-col items-start gap-[1rem] self-stretch bg-white p-[20px_25px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                <span className="self-stretch text-center text-body-2-bold text-main-pink">
                  정답은?
                </span>
                <span className="self-stretch text-center text-headline-5 text-black">
                  {answer}
                </span>
              </div>

              <div className="flex w-[32rem] flex-col items-center gap-[2.4rem]">
                <span className="self-stretch text-center text-headline-5 text-black">
                  {`${answerCount}명이 정답을 맞췄어요!`}
                </span>
                <div className="grid-row-3 grid w-full grid-cols-4 gap-x-[1.6rem] gap-y-[2rem]">
                  {/*todo: 소켓으로 참여자리스트 가져와서 렌더링하기*/}
                  {correctedPeople.map((person)=><ProfileImage isSelected={person.correct} color={person.color}>{person.name}</ProfileImage>)}
                </div>
              </div>
            </article>
          </section>

          <div className="mb-[6rem] mt-[7rem]">
            <Button onClick={handleNextQuestion} disabled={isHost}>
              {cardStep <= 4 ? "다음 질문으로" : "다음으로"}
            </Button>
          </div>

          {isAllCorrect && (
            <Lottie
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                top: "54%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "30",
              }}
              key={1}
              animationData={animationData}
              loop={false}
              autoPlay={false}
            />
          )}
        </>
      )}
    </>
  );
};

export default AfterSelect;
