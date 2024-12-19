import { useState, useEffect } from "react";
import SearchInput from "../SearchInput";
import Sorting from "./Sorting";
import TeamBox from "./TeamBox";
import { useRouter } from "next/navigation";
import { useEdit } from "@/src/context/Context";
import Modal from "../common/Modal";

const SearchAndGetCard = ({
  ver,
  teamData,
  setTeamData,
  newTeamIndex,
  usedNewTeam,
  setUsedNewTeam,
}: {
  ver: "방명록" | "명함";
  teamData: Array<any>;
  setTeamData: React.Dispatch<React.SetStateAction<any[]>>;
  newTeamIndex: number | null;
  usedNewTeam: boolean;
  setUsedNewTeam: (value: boolean) => void;
}) => {
  const router = useRouter();
  const { isEditing } = useEdit();
  const [selectedTeamBoxes, setSelectedTeamBoxes] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModal, setIsModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"selected" | "all" | null>(null);
  const [sortOption, setSortOption] = useState("최신순");
  const [toggleFav, setToggleFav] = useState(null);

  const addCardBtn = () => {
    router.push("/card/camera");
  };

  useEffect(() => {
    if (!isEditing) {
      setSelectedTeamBoxes([]); 
    }
  }, [isEditing]);

  const [filteredTeamData, setFilteredTeamData] = useState(teamData);

  useEffect(() => {
    let sortedData = [...teamData];

    if (searchValue.trim() !== "") {
      sortedData = sortedData.filter((team) =>
        team.teamName.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (sortOption === "최신순") {
      sortedData = sortedData.sort((a, b) => {
        return new Date(b.cardDate).getTime() - new Date(a.cardDate).getTime();
      });
    } else if (sortOption === "가나다순") {
      sortedData = sortedData.sort((a, b) => {
        return a.teamName.localeCompare(b.teamName);
      });
    } else if (sortOption === "즐겨찾기") {
      sortedData = sortedData.filter((item) => item.isFav);
    }

    setFilteredTeamData(sortedData);
  }, [teamData, searchValue, sortOption]);

  const handleSearch = () => {};

  const handleSelectTeamBox = (index: number) => {
    if (!isEditing) {
      return;
    }

    if (newTeamIndex !== null && index === newTeamIndex) {
      setSelectedTeamBoxes([index]);
    } else {
      if (selectedTeamBoxes.includes(index)) {
        setSelectedTeamBoxes(
          selectedTeamBoxes.filter((item) => item !== index),
        );
      } else {
        setSelectedTeamBoxes([...selectedTeamBoxes, index]);
      }
    }
  };

  const handleDeleteSelected = () => {
    const selectedTeamNames = selectedTeamBoxes.map(
      (index) => filteredTeamData[index].teamName,
    );

    setTeamData((prevData) =>
      prevData.filter((team) => !selectedTeamNames.includes(team.teamName)),
    );

    setSelectedTeamBoxes([]);
    setIsModal(false);
  };

  useEffect(() => {
    if (toggleFav !== null) {
      const selectedTeam = filteredTeamData[toggleFav];
      if (!selectedTeam) return;

      setTeamData((prevData) =>
        prevData.map((team) =>
          team.teamName === selectedTeam.teamName
            ? { ...team, isFav: !team.isFav }
            : team,
        ),
      );
    }
  }, [toggleFav]);

  const handleDeleteAll = () => {
    setTeamData([]);
    setSelectedTeamBoxes([]);
    setIsModal(false);
  };

  const deleteModal = (type: "selected" | "all") => {
    setDeleteType(type);
    setIsModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteType === "selected") {
      handleDeleteSelected();
    } else if (deleteType === "all") {
      handleDeleteAll();
    }
    setIsModal(false);
  };

  return (
    <div className="w-full">
      <div className="w-[calc(100% - 4rem)] mx-[2rem]">
        <SearchInput
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          placeholderText={
            ver === "명함" ? "팀명 또는 이름 검색" : "방명록 검색"
          }
          isQr={false}
          onSearch={handleSearch}
        />
        <div className="mb-[1.2rem] mt-[2.4rem] flex h-[3.6rem] w-full justify-between">
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-body-1-med text-gray-11">
              보관된 {ver === "명함" ? "명함" : "방명록"}
            </span>
            <span className="text-body-1-bold text-gray-7">
              {filteredTeamData.length}
            </span>
          </div>
          <Sorting
            onDeleteSelected={() => deleteModal("selected")}
            onDeleteAll={() => deleteModal("all")}
            deleteModal={deleteModal}
            setSortOption={setSortOption}
          />
        </div>
        <div className="flex w-full flex-col gap-[1.2rem]">
          {filteredTeamData.map((team, index) => (
            <TeamBox
              key={index}
              isSelected={selectedTeamBoxes.includes(index)}
              onSelect={handleSelectTeamBox}
              team={team}
              index={index}
              newTeamIndex={newTeamIndex}
              usedNewTeam={usedNewTeam}
              setUsedNewTeam={setUsedNewTeam}
              setToggleFav={setToggleFav}
            />
          ))}
        </div>
      </div>
      {isModal && (
        <Modal
          actionText="취소"
          buttonText={ver === "방명록" ? "방명록 삭제" : "명함 삭제"}
          isOpen={true}
          title={
            ver === "방명록"
              ? "방명록을 삭제하시겠어요?"
              : "명함을 삭제하시겠어요?"
          }
          description={
            ver === "방명록"
              ? "대화방 내용이 복구되지 않아요"
              : "명함 내용이 복구되지 않아요"
          }
          onAction={() => setIsModal(false)}
          onClose={handleConfirmDelete}
        />
      )}
      {ver === "명함" && (
        <div
          className="fixed bottom-0 flex h-[13rem] w-full max-w-[76.8rem] justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0.28%, #FFF 158.49%)",
          }}
        >
          <button
            onClick={addCardBtn}
            className="h-[5.6rem] w-[33.5rem] rounded-[1.2rem] bg-gray-11 text-subhead-bold text-white"
          >
            명함 추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndGetCard;
