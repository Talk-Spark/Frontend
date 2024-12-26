import { useState, useEffect } from "react";
import SearchInput from "../SearchInput";
import Sorting from "./Sorting";
import TeamBox from "./TeamBox";
import Modal from "../common/Modal";

interface Team {
  teamName: string;
  teamPeopleCount: number;
  cardDate: string;
  participants: string;
  isFav: boolean;
}

type GuestBookProps = {
  ver: "방명록" | "명함";
  teamData: Team[];
  setTeamData: React.Dispatch<React.SetStateAction<Team[]>>;
  isEdit: "edit" | "complete";
  isLoading?: boolean;
};

type NameCardProps = GuestBookProps & {
  isNewData?: boolean;
  setIsNewData?: (value: boolean) => void;
  setIsCamera?: (value: boolean) => void;
};

// type SearchAndGetCardProps = GuestBookProps | NameCardProps;

const SearchAndGetCard = (props: NameCardProps) => {
  const {
    ver,
    teamData,
    setTeamData,
    isEdit,
    isLoading,
    isNewData,
    setIsNewData,
    setIsCamera,
  } = props;

  const [selectedTeamBoxes, setSelectedTeamBoxes] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModal, setIsModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"selected" | "all" | null>(null);
  const [sortOption, setSortOption] = useState("최신순");
  const [toggleFav, setToggleFav] = useState<number | null>(null);

  const addCardBtn = () => {
    if (ver === "명함" && setIsCamera) {
      setIsCamera(true); // setIsCamera가 정의되어 있을 때만 호출
    }
  };

  useEffect(() => {
    if (isEdit === "edit") {
      setSelectedTeamBoxes([]);
    }
  }, [isEdit]);

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

  // 편집 시 팀 박스 선택
  const handleSelectTeamBox = (index: number) => {
    if (isEdit === "edit") {
      return;
    }

    if (selectedTeamBoxes.includes(index)) {
      // 기존 팀 박스 선택/해제 처리
      setSelectedTeamBoxes(selectedTeamBoxes.filter((item) => item !== index));
    } else {
      setSelectedTeamBoxes([...selectedTeamBoxes, index]);
    }
  };

  const handleDeleteSelected = () => {
    // 선택된 팀 이름을 찾아서 TeamData 배열 초기화
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
            deleteModal={deleteModal}
            setSortOption={setSortOption}
            isEdit={isEdit}
          />
        </div>
        <div className="flex w-full flex-col gap-[1.2rem]">
          {filteredTeamData.map((team, index) => (
            <TeamBox
              key={index}
              isSelected={selectedTeamBoxes.includes(index)}
              isEdit={isEdit}
              onSelect={handleSelectTeamBox}
              team={team}
              index={index}
              setToggleFav={() => setToggleFav(index)}
              isLoading={isLoading}
              {...(ver === "명함" ? { isNewData } : {})} // 명함일 때만 isNewData 전달
              {...(ver === "명함" ? { setIsNewData } : {})}
              ver="방명록"
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
