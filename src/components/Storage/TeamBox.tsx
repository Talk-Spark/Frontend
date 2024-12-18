import { useState } from "react";
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
  };
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

const TeamBox = ({ team, index, isSelected, onSelect }: TeamBoxProps) => {
  const [isFav, setIsFav] = useState(false);
  const { isEditing } = useEdit();

  const boxBgColor = isSelected
    ? "bg-sub-palePink-55 border-sub-palePink"
    : "bg-gray-1 border-gray-2";
  const router = useRouter();
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
  const maxVisible = 4; // 보여지는 최대 이름 수

  const displayedParticipants =
    participantsClean.length > maxVisible
      ? `${participantsClean.slice(0, maxVisible).join(" ")} ∙∙∙`
      : participantsClean.join(" ");

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
          src={isFav ? starPinkIcon : starIcon}
          onClick={() => setIsFav(!isFav)}
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
