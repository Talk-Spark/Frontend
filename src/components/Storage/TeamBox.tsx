import starIcon from "@/public/nameCard/Star.svg";
import starPinkIcon from "@/public/nameCard/pinkStar.svg";

import Image from "next/image";
import { useState } from "react";

const TeamBox = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const boxBgColor = isSelected
    ? "bg-sub-palePink-55 border-sub-palePink"
    : "bg-gray-1 border-gray-2";
  return (
    <div
      className={`flex h-[7.2rem] w-full flex-col justify-between gap-[0.4rem] rounded-[1.2rem] border-[0.1rem] ${boxBgColor} px-[1.6rem] py-[1.4rem]`}
    >
      <div className="flex justify-between">
        <div className="flex gap-[0.4rem]">
          <span className="text-body-2-bold text-gray-11">방이룸</span>
          <span className="text-body-2-med text-gray-7">참가자수</span>
        </div>
        <Image
          src={isFav ? starPinkIcon : starIcon}
          onClick={() => setIsFav(!isFav)}
          alt="즐겨찾기"
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-between">
        <span className="text-body-2-reg text-gray-9">방장</span>
        <span className="text-caption-med text-gray-5">7월 24일</span>
      </div>
    </div>
  );
};
export default TeamBox;
