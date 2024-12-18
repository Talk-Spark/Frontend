import { useState, useEffect } from "react";
import SearchInput from "../SearchInput";
import Sorting from "./Sorting";
import TeamBox from "./TeamBox";
import { useRouter } from "next/navigation";
import { useEdit } from "@/src/context/Context";
import Modal from "../common/Modal";

const SearchAndGetCard = () => {
  const router = useRouter();
  const { isEditing } = useEdit();
  const [selectedTeamBoxes, setSelectedTeamBoxes] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModal, setIsModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"selected" | "all" | null>(null);

  const [teamData, setTeamData] = useState([
    {
      teamName: "멋쟁이 데모팀",
      teamPeopleCount: 5,
      cardDate: "2024-11-03 14:30:15",
      participants: "박하경 진예원 이나윤 진예원 진예원",
    },
    {
      teamName: "프론트엔드팀",
      teamPeopleCount: 3,
      cardDate: "2024-11-02 10:15:10",
      participants: "김동욱 공준혁 최정인",
    },
    {
      teamName: "백엔드팀",
      teamPeopleCount: 3,
      cardDate: "2024-11-01 09:05:20",
      participants: "김민우 이윤정 박승범",
    },
  ]);

  const addCardBtn = () => {
    router.push("/card/camera");
  };

  // isEditing이 false일 때 selectedTeamBoxes 초기화
  useEffect(() => {
    if (!isEditing) {
      setSelectedTeamBoxes([]); // 배열 초기화
    }
  }, [isEditing]);

  const handleSearch = () => {};

  const handleSelectTeamBox = (index: number) => {
    if (!isEditing) {
      return;
    }

    if (selectedTeamBoxes.includes(index)) {
      setSelectedTeamBoxes(selectedTeamBoxes.filter((item) => item !== index));
    } else {
      setSelectedTeamBoxes([...selectedTeamBoxes, index]);
    }
  };

  const handleDeleteSelected = () => {
    // 선택된 팀 박스를 teamData에서 삭제
    setTeamData((prevData) =>
      prevData.filter((_, index) => !selectedTeamBoxes.includes(index)),
    );
    setSelectedTeamBoxes([]); // 삭제 후 선택된 팀 박스도 초기화
    setIsModal(false);
  };

  const handleDeleteAll = () => {
    setTeamData([]); // 모든 팀 데이터 삭제
    setSelectedTeamBoxes([]); // 선택된 팀 박스 초기화
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
          placeholderText={"팀명 또는 이름 검색"}
          isQr={false}
          onSearch={handleSearch}
        />
        <div className="mb-[1.2rem] mt-[2.4rem] flex h-[3.6rem] w-full justify-between">
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-body-1-med text-gray-11">보관된 명함</span>
            <span className="text-body-1-bold text-gray-7">
              {teamData.length}
            </span>
          </div>
          <Sorting
            onDeleteSelected={() => deleteModal("selected")}
            onDeleteAll={() => deleteModal("all")}
            deleteModal={deleteModal}
          />
        </div>
        <div className="flex w-full flex-col gap-[1.2rem]">
          {teamData.map((team, index) => (
            <TeamBox
              key={index}
              isSelected={selectedTeamBoxes.includes(index)}
              onSelect={handleSelectTeamBox}
              team={team}
              index={index}
            />
          ))}
        </div>
      </div>
      {isModal && (
        <Modal
          actionText="취소"
          buttonText="명함 삭제"
          isOpen={true}
          title="명함을 삭제하시겠어요?"
          description="명함 내용이 복구되지 않아요"
          onAction={() => setIsModal(false)}
          onClose={handleConfirmDelete}
        />
      )}
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
    </div>
  );
};

export default SearchAndGetCard;
