"use client";
import creatingRoomImage from "@/public/Image/home/creatingRoomImage.svg";
import enteringRoomImage from "@/public/Image/home/enteringRoomImage.svg";
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
          TalkSpark
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
            className="h-[13.2rem] w-[16.2rem] text-subhead-bold shadow-DEFAULT"
            onClick={() => handleRouting("/creating-room")}
          >
            {/* 방 만들기 */}
            <Image src={creatingRoomImage} alt="방 만들기" />
          </div>
          <div
            className="h-[13.2rem] w-[16.2rem] text-subhead-bold shadow-DEFAULT"
            onClick={() => handleRouting("/entry")}
          >
            {/* 입장하기 */}
            <Image src={enteringRoomImage} alt="입장하기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMatching;
