"use client";

import Button from "@/src/components/common/Button";
import animationData from "./creating-card.json";
import Lottie from "react-lottie-player";

const Page = () => {
  return (
    <div className="mb-[6rem] mt-[2.4rem] flex flex-col items-center justify-center">
      <div className="mb-[3.2rem] text-center text-headline-3 text-black">
        환영해요
        <br />
        명함이 완성되었어요!
      </div>
      <div className="mb-[12.3rem] h-[33.5rem] w-[33.5rem]">
        <Lottie loop animationData={animationData} play />
      </div>
      <div className="flex gap-[1.1rem]">
        {/* todo: Button에 라우팅 적용 */}
        <Button variant="gray" size="l">
          홈으로
        </Button>
        <Button variant="pink" size="l">
          명함 보관함
        </Button>
      </div>
    </div>
  );
};

export default Page;
