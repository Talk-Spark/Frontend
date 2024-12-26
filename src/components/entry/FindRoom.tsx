import Image from "next/image";
import searchGraphic from "@/public/Image/entry/searchGraphic.svg";
import starPink from "@/public/Image/entry/starPink.svg";
import starBlue from "@/public/Image/entry/starBlue.svg";
import starMint from "@/public/Image/entry/starMint.svg";
import starYellow from "@/public/Image/entry/starYellow.svg";

const FindRoom = () => {
  return (
    <div>
      <div className="mt-[5.2rem] flex justify-center pl-[3.5rem] pr-[2rem] pt-[3rem] text-gray-10">
        <div className="relative flex h-[30rem] w-[28rem] flex-col items-center justify-center gap-[2.1rem]">
          <span className="z-0 text-graphic-font">우리 팀을 찾아보아요~</span>
          <Image
            src={searchGraphic}
            alt="검색 그래픽"
            width={145}
            className="relative z-20"
          />
          <Image
            src={starPink}
            alt="핑크별 이미지"
            className="absolute -right-[2rem] top-[12rem] z-10"
          />
          <Image
            src={starBlue}
            alt="블루별 이미지"
            className="absolute -top-[1rem] right-[1rem] z-10"
          />
          <Image
            src={starMint}
            alt="민트별 이미지"
            className="absolute right-[21rem] top-[18rem] z-10"
          />
          <Image
            src={starYellow}
            alt="엘로우별 이미지"
            className="absolute right-[13rem] top-[3rem] z-10"
          />
        </div>
      </div>
    </div>
  );
};
export default FindRoom;
