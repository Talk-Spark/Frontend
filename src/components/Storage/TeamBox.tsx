"use client";
import { useState, useEffect } from "react";
import starIcon from "@/public/nameCard/Star.svg";
import starPinkIcon from "@/public/nameCard/pinkStar.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TeamBoxProps {
  team: {
    teamName: string;
    teamPeopleCount: number;
    cardDate: string;
    participants: string;
    isFav: boolean;
  };
  index: number;
  isSelected: boolean;
  isEdit: "complete" | "edit";
  onSelect: (index: number) => void;
  setToggleFav: (index: number) => void;
  isNewData?: boolean;
  setIsNewData?: (value: boolean) => void;
  isLoading?: boolean;
  ver: "명함" | "방명록";
}

const TeamBox = ({
  team,
  index,
  isSelected,
  isEdit,
  onSelect,
  setToggleFav,
  setIsNewData,
  isNewData,
  isLoading,
  ver,
}: TeamBoxProps) => {
  const [bgColor, setBgColor] = useState("bg-gray-1");
  const router = useRouter();

  useEffect(() => {
    if (isNewData && index === 0 && !isLoading && setIsNewData) {
      setBgColor("bg-sub-palePink-55 border-sub-palePink");
      setIsNewData(false);
      setTimeout(() => {
        setBgColor("bg-gray-1");
      }, 3000);
    }
  }, [isNewData]);

  // 선택되었을때 메인 컬러
  const boxBgColor = isSelected
    ? "bg-sub-palePink-55 border-sub-palePink"
    : bgColor;

  const showDetailCard = () => {
    if (isEdit === "complete") {
      onSelect(index);
    } else if (ver === "명함") {
      router.push("/card/detail/[name]");
    } else if (ver === "방명록") {
      router.push("/guest-book/[id]");
    }
    onSelect(index);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const formattedDate = formatDate(team.cardDate);

  const participantsClean = team.participants.split(" ");
  const maxVisible = 4; // 보여지는 최대 이름 수
  const maxText = 18; // 보여지는 방명록 메세지 최대 길이 수

  const displayedParticipants =
    participantsClean.length > maxVisible
      ? `${participantsClean.slice(0, maxVisible).join(" ")} ...`
      : participantsClean.join(" ");

  const getPreviewContent = (content?: string) => {
    if (ver === "방명록" && content) {
      return content.length > maxText
        ? `${content.slice(0, maxText)}...`
        : content;
    }
    return content;
  };

  const previewContent = getPreviewContent(team.participants);

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setToggleFav(index);
  };

  return (
    <div
      onClick={() => showDetailCard()}
      className={`flex h-[7.2rem] w-full cursor-pointer flex-col justify-between gap-[0.4rem] rounded-[1.2rem] border-[0.1rem] ${boxBgColor} ${isEdit === "complete" && "cursor-pointer"} px-[1.6rem] py-[1.4rem]`}
    >
      <div className="flex justify-between">
        <div className="flex gap-[0.4rem]">
          <span className="text-body-2-bold text-gray-11">{team.teamName}</span>
          <span className="text-body-2-med text-gray-7">
            {team.teamPeopleCount}
          </span>
        </div>
        <Image
          src={team.isFav ? starPinkIcon : starIcon}
          onClick={handleFavClick}
          alt="즐겨찾기"
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-between">
        <span className="text-body-2-reg text-gray-9">
          {ver === "방명록" ? previewContent : displayedParticipants}
        </span>
        <span className="text-caption-med text-gray-5">{formattedDate}</span>
      </div>
    </div>
  );
};
export default TeamBox;
