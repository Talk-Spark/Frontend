"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import MyCard from "@/src/components/Storage/MyCard";
import ToggleBar from "@/src/components/Storage/ToggleBar";
import Header from "@/src/components/Headers/Header";
import Logout from "@/src/components/Storage/Logout";

const Card = () => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");
  const name = searchParams.get("name");
  const timestamp = searchParams.get("timestamp");
  const router = useRouter();

  type TeamData = {
    teamName: string;
    teamPeopleCount: number;
    cardDate: string;
    participants: string;
    isFav: boolean;
  };

  const [teamData, setTeamData] = useState<TeamData[]>([
    // 더미데이터
    // {
    //   teamName: "멋쟁이 데모팀",
    //   teamPeopleCount: 5,
    //   cardDate: "2024-11-03 14:30:15",
    //   participants: "박하경 진예원 이나윤 진예원 진예원",
    //   isFav: true,
    // },
    // {
    //   teamName: "프론트엔드팀",
    //   teamPeopleCount: 3,
    //   cardDate: "2024-11-02 10:15:10",
    //   participants: "김동욱 공준혁 최정인",
    //   isFav: false,
    // },
    // {
    //   teamName: "백엔드팀",
    //   teamPeopleCount: 3,
    //   cardDate: "2024-11-01 09:05:20",
    //   participants: "김민우 이윤정 박승범",
    //   isFav: false,
    // },
  ]);

  const [newTeamIndex, setNewTeamIndex] = useState<number | null>(null);
  const [usedNewTeam, setUsedNewTeam] = useState(false);
  const [activeView, setActiveView] = useState<"mine" | "others">("others");
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState<"edit" | "complete">("edit");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<"logout" | "delete" | null>(
    null,
  );

  const handleToggle = (view: "mine" | "others") => {
    setActiveView(view);
    if (view === "mine") {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (cardId && name && timestamp) {
      const newData = {
        teamName: name,
        teamPeopleCount: 1,
        cardDate: timestamp,
        participants: name,
        isFav: false,
      };

      setTeamData((prevData) => {
        const exists = prevData.some(
          (item) =>
            item.teamName === newData.teamName &&
            item.cardDate === newData.cardDate,
        );
        if (!exists) {
          setNewTeamIndex(0);
          setUsedNewTeam(false);
          return [...prevData, newData];
        }
        return prevData;
      });
    }
  }, [cardId, name, timestamp]);

  const handleCompleteClick = () => {
    if (activeView === "mine") {
      setIsModalVisible((prev) => !prev);
    } else {
      setIsEdit((prev) => (prev === "edit" ? "complete" : "edit"));
    }
  };

  const mineSettingBtn: "settings" | "edit" | "complete" =
    activeView === "mine" ? "settings" : isEdit;

  return (
    <>
      <div className="-mx-[2rem] w-[calc(100%+4rem)]">
        <Header
          title="명함 보관함"
          padding={true}
          showButton1={true}
          button2Type={mineSettingBtn}
          button2Action={handleCompleteClick}
        />
      </div>

      <div className="relative -mx-[2rem] flex w-[calc(100%+4rem)] flex-col items-center">
        {activeView === "mine" && isModalVisible && (
          <Logout modalAction={modalAction} setModalAction={setModalAction} />
        )}
        <ToggleBar handleToggle={handleToggle} activeView={activeView} />
        {activeView === "others" ? (
          <SearchAndGetCard
            teamData={teamData}
            setTeamData={setTeamData}
            ver={"명함"}
            newTeamIndex={newTeamIndex}
            usedNewTeam={usedNewTeam}
            setUsedNewTeam={setUsedNewTeam}
            isEdit={isEdit}
          />
        ) : (
          <MyCard isVisible={isVisible} isEdit={isEdit} />
        )}
      </div>
    </>
  );
};

export default Card;
