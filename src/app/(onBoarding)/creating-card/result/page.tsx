"use client";

import Button from "@/src/components/common/Button";
import animationData from "./creating-card.json";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; //app router방식에서는 /navigation 이용 필요

const Lottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();

  const handleRouting = (addr: string) => {
    router.push(addr);
    //뒤로가기 업생려면 router.replace 이용
  };

  return (
    <div className="mb-[6rem] mt-[2.4rem] flex flex-col items-center justify-center">
      <div className="mb-[3.2rem] text-center text-headline-3 text-black">
        환영해요
        <br />
        명함이 완성되었어요!
      </div>
      <div className="mb-[12.3rem] h-[33.5rem] w-[33.5rem]">
        {/*todo: 무한 루프 없애달라고 요청 오면 로띠 마지막 프레임 고쳐달라고 말씀드리기 */}
        <Lottie loop animationData={animationData} play />
      </div>
      <div className="flex gap-[1.1rem]">
        {/* todo: Button에 라우팅 적용 */}
        <Button variant="gray" size="l" onClick={() => handleRouting("/home")}>
          홈으로
        </Button>
        <Button variant="pink" size="l" onClick={() => handleRouting("/card")}>
          명함 보관함
        </Button>
      </div>
    </div>
  );
};

export default Page;
