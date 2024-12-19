"use client";

import { useState, useEffect } from "react";
import starIcon from "@/public/nameCard/Star.svg";
import starPinkIcon from "@/public/nameCard/pinkStar.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEdit } from "@/src/context/Context";

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
  onSelect: (index: number) => void;
  newTeamIndex: number | null;
  usedNewTeam: boolean;
  setUsedNewTeam: (value: boolean) => void;
  setToggleFav: (index: number) => void;
}

const TeamBox = ({
  team,
  index,
  isSelected,
  onSelect,
  newTeamIndex,
  usedNewTeam,
  setUsedNewTeam,
  setToggleFav,
}: TeamBoxProps) => {
  const [bgColor, setBgColor] = useState("bg-gray-1");
  const { isEditing } = useEdit();
  const router = useRouter();

  useEffect(() => {
    if (newTeamIndex === index && !usedNewTeam) {
      setBgColor("bg-sub-palePink-55 border-sub-palePink");
      setUsedNewTeam(true);
      setTimeout(() => {
        setBgColor("bg-gray-1");
      }, 3000);
    }
  }, [newTeamIndex, index, usedNewTeam, setUsedNewTeam]);

  const boxBgColor = isSelected
    ? "bg-sub-palePink-55 border-sub-palePink"
    : bgColor;

  const showDetailCard = () => {
    if (isEditing) {
      return;
    }
    router.push("/card/detail/[name]");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const formattedDate = formatDate(team.cardDate);
  const participantsClean = team.participants.split(" ");
  const maxVisible = 4;

  const displayedParticipants =
    participantsClean.length > maxVisible
      ? `${participantsClean.slice(0, maxVisible).join(" ")} ∙∙∙`
      : participantsClean.join(" ");

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from propagating to the parent
    setToggleFav(index);
  };

  return (
    <div
      onClick={() => onSelect(index)}
      className={`flex h-[7.2rem] w-full flex-col justify-between gap-[0.4rem] rounded-[1.2rem] border-[0.1rem] ${boxBgColor} ${isEditing && "cursor-pointer"} px-[1.6rem] py-[1.4rem]`}
    >
      <div className="flex justify-between">
        <div className="flex gap-[0.4rem]">
          <span
            onClick={showDetailCard}
            className="cursor-pointer text-body-2-bold text-gray-11"
          >
            {team.teamName}
          </span>
          <span className="text-body-2-med text-gray-7">
            {team.teamPeopleCount}
          </span>
        </div>
        <Image
          src={team.isFav ? starPinkIcon : starIcon}
          onClick={handleFavClick} // Use the handleFavClick to stop propagation
          alt="즐겨찾기"
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-between">
        <span className="text-body-2-reg text-gray-9">
          {displayedParticipants}
        </span>
        <span className="text-caption-med text-gray-5">{formattedDate}</span>
      </div>
    </div>
  );
};

export default TeamBox;
