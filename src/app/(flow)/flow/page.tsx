"use client";
import React from "react";
import question from "@/public/nameCard/question.svg";
import warning_circle from "@/public/nameCard/warning_circle.svg";
import popup_bg from "@/public/nameCard/popup_bg.png";
import Image from "next/image";
import NameCard from "@/src/components/NameCard";
import Button from "@/src/components/common/Button";

const page = () => {
  return (
    <main className="bg-gray-1">
      <section className="flex h-auto w-[37.5rem] flex-col items-center gap-[2.4rem]">
        <article className="flex h-[37.2rem] w-[37.5rem] shrink-0 items-center justify-center self-stretch bg-sub-pink-55">
          <div className="flex w-[33.5rem] flex-col gap-[1.2rem]">
            <NameCard
              teamName="팀이름 ㅋㅋ"
              name="JunHyuk Kong"
              age={18}
              major="컴퓨터공학과"
              mbti="INTJ"
              hobby="축구"
              lookAlike="강동원"
              selfDescription="안녕하세요 저는 공준혁이라고 합니다"
              tmi="카페인이 너무 잘 들어요"
              selectedCategory={"TMI"}
              onCategorySelect={() => alert("hi")}
            />
            <div className="flex gap-[0.5rem]">
              <div className="relative w-[20px]">
                <Image src={question} alt="quest" />
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
              </div>
              <span className="text-body-1-med text-gray-8">
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
            <button className="br-[0.8rem] flex h-[5.6rem] w-[16.2rem] items-center justify-center gap-[1rem] rounded-[8px] border-gray-4 bg-white pb-[0.8rem] pl-[1.2rem] pr-[0.8rem] pt-[0.8rem] text-body-2-med text-gray-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
              {`A.`}
            </button>
            <button className="br-[0.8rem] flex h-[5.6rem] w-[16.2rem] items-center justify-center gap-[1rem] rounded-[8px] border-gray-4 bg-white pb-[0.8rem] pl-[1.2rem] pr-[0.8rem] pt-[0.8rem] text-body-2-med text-gray-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
              {`B.`}
            </button>
          </div>

          <div className="flex items-center justify-center gap-[1.2rem] self-stretch">
            <button className="br-[0.8rem] flex h-[5.6rem] w-[16.2rem] items-center justify-center gap-[1rem] rounded-[8px] border-gray-4 bg-white pb-[0.8rem] pl-[1.2rem] pr-[0.8rem] pt-[0.8rem] text-body-2-med text-gray-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
              {`C.`}
            </button>
            <button className="br-[0.8rem] flex h-[5.6rem] w-[16.2rem] items-center justify-center gap-[1rem] rounded-[8px] border-gray-4 bg-white pb-[0.8rem] pl-[1.2rem] pr-[0.8rem] pt-[0.8rem] text-body-2-med text-gray-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
              {`D.`}
            </button>
          </div>
        </article>

        <div className="flex w-[33.6rem] flex-col items-start gap-[0.8rem]">
          <Button>선택 완료</Button>
          <span className="flex items-center justify-center gap-[0.4rem] self-stretch text-caption-bold text-gray-7">
            <Image src={warning_circle} alt="warning" />
            선택 완료 후에는 답변을 변경할 수 없어요!
          </span>
          <div className="h-[2.6rem]"></div>
        </div>
      </section>
    </main>
  );
};

export default page;
