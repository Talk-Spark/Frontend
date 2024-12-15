import React from "react";
import ProfileImage from "../ProfileImage";
import Button from "@/src/components/common/Button";

const AfterSelect = () => {
  return (
    <>
      <section className="relative flex h-auto w-[37.5rem] flex-col items-center justify-start gap-[2.4rem] pt-[2.4rem]">
        <article className="flex w-[33.5rem] flex-col items-center gap-[3.6rem]">
          <div className="br-[1.2rem] flex flex-col items-start gap-[1rem] self-stretch bg-white p-[20px_25px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
            <span className="self-stretch text-center text-body-2-bold text-main-pink">
              정답은?
            </span>
            <span className="self-stretch text-center text-headline-5 text-black">
              D.어쩌구저쩌구가 정답입니다
            </span>
          </div>

          <div className="flex w-[32rem] flex-col items-center gap-[2.4rem]">
            <span className="self-stretch text-center text-headline-5 text-black">
              n명이 정답을 맞췄어요!
            </span>
            <div className="grid-row-3 grid w-full grid-cols-4 gap-x-[1.6rem] gap-y-[2rem]">
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
              <ProfileImage isSelected={true}>안녕하세요dddddddd</ProfileImage>
              <ProfileImage color="yellow" isSelected={true}>
                안녕하세요
              </ProfileImage>
              <ProfileImage isSelected={true}>안녕하세요</ProfileImage>
              <ProfileImage color="green" isSelected={false}>
                안녕하세요
              </ProfileImage>
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
              <ProfileImage isSelected={false}>안녕하세요</ProfileImage>
            </div>
          </div>
        </article>
      </section>

      <div className="mb-[6rem] mt-[7rem]">
        <Button>다음 질문으로</Button>
      </div>
    </>
  );
};

export default AfterSelect;
