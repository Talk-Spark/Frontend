"use client";

import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import question from "@/public/nameCard/question.svg";
import warning_circle from "@/public/nameCard/warning_circle.svg";
import popup_bg from "@/public/nameCard/popup_bg.png";
import Image from "next/image";
import NameCard from "@/src/components/NameCard";
import Button from "@/src/components/common/Button";
import { NameCardObjProps } from "@/src/app/(flow)/flow/page";
import { CardFlowType } from "@/src/app/(flow)/flow/page";
import { CARD_FLOW } from "@/src/app/(flow)/flow/page";
import { Socket } from "socket.io-client";

interface BeforeSelectProps {
  cardStep: number;
  setIsBefore: (input: boolean) => void;
  setCardStep: Dispatch<SetStateAction<number>>;
  socketRef: MutableRefObject<Socket>;
  roomId: string;
  isHost: boolean;
}

interface CardDataProps {
  id: number;
  kakaoId: string;
  ownerId: number;

  name: string;
  age: number;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  slogan: string;
  tmi: string;
}

interface QuizDataProps {
  cardId: number; // 명함 아이디
  cardOwnerId: number; // 명함 주인 회원아이디
  fieldName: "mbti" | "hobby" | "lookAlike" | "selfDescription" | "tmi"; // 빈칸으로 뚫릴 필드의 이름 (ex: "name", "age") -> mbti, hobby, lookAlike, selfDescription ,tmi
  correctAnswer: string; // 정답(보기 번호가 아니고 정답 내용이 들어갑니다. 문제 종류 관계없이 string입니다.)
  options: string[]; //정답 보기들(아마 4개)
}

export const CARD_FIELD_NUMBER = {
  mbti: 0,
  hobby: 1,
  lookAlike: 2,
  selfDescription: 3,
  tmi: 4,
} as const;

const BeforeSelect = ({
  cardStep,
  setIsBefore,
  setCardStep,
  socketRef,
  roomId,
  isHost,
}: BeforeSelectProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(""); //선택하는 거 emit하고 넘어가야함
  const [isAnswerSeleted, setIsAnswerSeleted] = useState(false);
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
  const [quizInfo, setQuizInfo] = useState<QuizDataProps | null>();
  const popUpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //만약 순서 꼬이면 emit과 on의 순서 바꿔보기
    socketRef.current.emit("getQuestion", { roomId });
    socketRef.current.on("question", (data) => {
      console.log(data); //실제로 데이터 형식 보고 데이터 연결하기
      //그래도 일단 노션에 있는거 믿고 작성
      const cardData: CardDataProps = data[1];
      const quizData: QuizDataProps = data[2];

      setNameCardInfo({
        teamName: cardData.slogan, //todo: 수정 필요
        name: cardData.name,
        age: cardData.age,
        major: cardData.major,
        mbti: cardData.mbti,
        hobby: cardData.hobby,
        lookAlike: cardData.lookAlike,
        selfDescription: cardData.slogan, // todo: 수정 필요
        tmi: cardData.tmi,
      });
      setQuizInfo(quizData);
      setCardStep(CARD_FIELD_NUMBER[quizData.fieldName]);
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

    const handleClickOutSide = (e: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target as Node)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClickButton = (item: string) => {
    if (!isAnswerSeleted) setSelectedButton(item);
  };

  const handleAnswerSelect = () => {
    if (selectedButton) {
      setIsAnswerSeleted(true);
      //todo: userId 식별할 수 있는 방법 상의한 후, 그 userId를 잘 실어서 보내야함.
      socketRef.current.emit("submitSelection", {
        roomId,
        sparkUserId: userId,
        answer: selectedButton,
      });
    }
  };

  if (cardStep > 4) {
    //퀴즈 다 맞춘 상태 -> 알맞은 단계로 이어져야 함
    return;
  }

  if (!NameCardInfo || !quizInfo || !popUpRef) return;

  return (
    <section className="flex h-auto w-[37.5rem] flex-col items-center gap-[2.4rem]">
      <article className="flex h-[37.2rem] w-[37.5rem] shrink-0 items-center justify-center self-stretch bg-sub-pink-55">
        <div className="flex w-[33.5rem] flex-col gap-[1.2rem]">
          <NameCard
            teamName={NameCardInfo.teamName}
            name={NameCardInfo.name}
            age={NameCardInfo.age}
            major={NameCardInfo.major}
            mbti={NameCardInfo.mbti}
            hobby={NameCardInfo.hobby}
            lookAlike={NameCardInfo.lookAlike}
            selfDescription={NameCardInfo.selfDescription}
            tmi={NameCardInfo.tmi}
            selectedCategory={CARD_FLOW[cardStep]}
            onCategorySelect={() => alert("hi")}
          />
          <div className="flex gap-[0.5rem]" ref={popUpRef}>
            <div className="relative w-[20px]">
              <Image src={question} alt="quest" onClick={handleOpenPopup} />
              {isPopupOpen && (
                <div
                  className="absolute left-[-6px] top-[16px] flex h-[82px] w-[333px] shrink-0 flex-col gap-[0.8rem] pl-[16px] pt-[22px] text-caption-med text-gray-8"
                  style={{
                    backgroundImage: `url(${popup_bg.src})`,
                    backgroundSize: "cover",
                  }}
                >
                  <span>{`1. 질문예시입니다질문예시입니다질문예시입니다질문예시입니\n`}</span>
                  <span>{`2. 질문예시입니다질문예시입니다질문예시입니다질문예시입니\n`}</span>
                </div>
              )}
            </div>
            <span
              className="text-body-1-med text-gray-8"
              onClick={handleOpenPopup}
            >
              이런 질문은 어때요?
            </span>
          </div>
        </div>
      </article>

      <article className="flex h-[16.5rem] w-[37.5rem] flex-col items-center gap-[1.2rem]">
        <span className="self-stretch text-center text-headline-5 text-black">
          빈칸을 채워주세요!
        </span>
        <div className="flex items-center justify-center gap-[1.2rem] self-stretch">
          {["A", "B"].map((item) => (
            <button
              key={item}
              onClick={() =>
                handleClickButton(
                  `${item === "A" ? quizInfo.options[0] : quizInfo.options[1]}`,
                )
              }
              className={`br-[0.8rem] flex h-[5.6rem] w-[16.2rem] items-center justify-center gap-[1rem] rounded-[8px] border-gray-4 pb-[0.8rem] pl-[1.2rem] pr-[0.8rem] pt-[0.8rem] text-body-2-med shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] ${selectedButton === item ? "bg-main-pink text-white" : "bg-white text-gray-12"}`}
            >{`${item}. ${item === "A" ? quizInfo.options[0] : quizInfo.options[1]}`}</button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-[1.2rem] self-stretch">
          {["C", "D"].map((item) => (
            <button
              key={item}
              onClick={() =>
                handleClickButton(
                  `${item === "C" ? quizInfo.options[2] : quizInfo.options[3]}`,
                )
              }
              className={`br-[0.8rem] flex h-[5.6rem] w-[16.2rem] items-center justify-center gap-[1rem] rounded-[8px] border-gray-4 pb-[0.8rem] pl-[1.2rem] pr-[0.8rem] pt-[0.8rem] text-body-2-med shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] ${selectedButton === item ? "bg-main-pink text-white" : "bg-white text-gray-12"}`}
            >{`${item}. ${item === "C" ? quizInfo.options[2] : quizInfo.options[3]}`}</button>
          ))}
        </div>
      </article>

      <div className="flex w-[33.6rem] flex-col items-start gap-[0.8rem]">
        <Button
          disabled={isAnswerSeleted}
          variant={`${(isAnswerSeleted && "gray") || "black"}`}
          onClick={handleAnswerSelect}
        >
          {isAnswerSeleted ? "기다리는 중이에요" : "선택 완료"}
        </Button>
        <span className="flex items-center justify-center gap-[0.4rem] self-stretch text-caption-bold text-gray-7">
          <Image src={warning_circle} alt="warning" />
          선택 완료 후에는 답변을 변경할 수 없어요!
        </span>
        <div className="h-[2.6rem]"></div>
      </div>
    </section>
  );
};

export default BeforeSelect;
