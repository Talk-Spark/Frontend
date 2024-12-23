"use client";
import Header from "@/src/components/Headers/Header";
import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import { useState } from "react";

const Page = () => {
  const [isEdit, setIsEdit] = useState<"edit" | "complete">("edit");
  const [usedNewTeam, setUsedNewTeam] = useState(false);
  const newTeamIndex = 0;
  const handleCompleteClick = () => {
    setIsEdit((prev) => (prev === "edit" ? "complete" : "edit"));
  };

  type TeamData = {
    teamName: string;
    teamPeopleCount: number;
    participants: string;
    cardDate: string;
    content: string;
    isFav: boolean;
  };

  const [teamData, setTeamData] = useState<TeamData[]>([
    // 더미데이터
    // {
    //   teamName: "멋쟁이 데모팀",
    //   teamPeopleCount: 5,
    //   cardDate: "2024-11-03 14:30:15",
    //   content: "박하경 진예원 이나윤 진예원 진예원",
    //   participants: "",
    //   isFav: true,
    // },
    // {
    //   teamName: "프론트엔드팀",
    //   teamPeopleCount: 3,
    //   cardDate: "2024-11-02 10:15:10",
    //   content: "김동욱 공준혁 최정인",
    //   participants: "",
    //   isFav: false,
    // },
    // {
    //   teamName: "백엔드팀",
    //   teamPeopleCount: 3,
    //   cardDate: "2024-11-01 09:05:20",
    //   content: "김민우 이윤정 박승범",
    //   participants: "",
    //   isFav: false,
    // },
  ]);

  return (
    <div className="-mx-[2rem] w-[calc(100%+4rem)]">
      <Header
        title="방명록 보관함"
        button2Type={isEdit}
        button2Action={handleCompleteClick}
        padding={true}
        showButton1={true}
      />{" "}
      <SearchAndGetCard
        setTeamData={setTeamData}
        teamData={teamData}
        ver="방명록"
        isEdit={isEdit}
        setUsedNewTeam={setUsedNewTeam}
        newTeamIndex={newTeamIndex}
        usedNewTeam={usedNewTeam}
      />
    </div>
  );
};
export default Page;
