"use client";
import creatingRoomImage from "@/public/Image/home/creatingRoomImage.svg";
import enteringRoomImage from "@/public/Image/home/enteringRoomImage.svg";
import talkSparkImage from "@/public/Image/home/TalkSpark.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CardMatching = () => {
  const router = useRouter();

  const handleRouting = (addr: string) => {
    router.push(addr);
  };

  return (
    <div className="w-screen bg-[url('/Image/home/backgroundImage.svg')] bg-cover">
      <div className="mx-[20px] flex flex-col gap-[0.8rem] pb-[1.2rem] pt-[1.6rem]">
        <div className="text-[2.6875rem] font-black leading-[4.3rem] tracking-[-0.0806rem] text-white">
          <Image src={talkSparkImage} alt="로고" />
        </div>
        <div className="text-body-1-med text-gray-2">
          톡스파크를 통해
          <br />
          서로의 명함을 공유해 보아요!
        </div>
      </div>
      <div className="mx-[20px] flex flex-col gap-[1.2rem] pb-[2.8rem] pt-[1.6rem]">
        <div className="text-headline-3 text-white">명함 맞추기</div>
        <div className="flex gap-[1.2rem]">
          <div
            className="h-[13.2rem] w-[16.2rem] cursor-pointer text-subhead-bold shadow-DEFAULT"
            onClick={() => handleRouting("/creating-room")}
          >
            <iframe
              src="/Image/home/creatingRoomImage.svg"
              className="pointer-events-none h-auto w-full"
            />
          </div>
          <div
            className="h-[13.2rem] w-[16.2rem] cursor-pointer text-subhead-bold shadow-DEFAULT"
            onClick={() => handleRouting("/entry")}
          >
            <iframe
              src="/Image/home/enteringRoomImage.svg"
              className="pointer-events-none h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMatching;
