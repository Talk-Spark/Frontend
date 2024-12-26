import { useState, useEffect } from "react";
import SearchInput from "../SearchInput";
import Sorting from "./Sorting";
import TeamBox from "./TeamBox";
import Modal from "../common/Modal";
import { instance, put } from "@/src/apis";

interface Team {
  cardHolderId: number;
  cardHolderName: string;
  numOfTeammates: number;
  teamNames: string[];
  bookMark: boolean;
  storedAt: string;
}

interface Room {
  roomId: number;
  roomName: string;
  roomDateTime: string;
  guestBookData: string[];
  guestBookFavorited: boolean;
}

type GuestBookProps = {
  ver: "방명록" | "명함";
  roomData?: Room[];
  setRoomData?: React.Dispatch<React.SetStateAction<Room[]>>;
  isEdit: "edit" | "complete";
  isLoading?: boolean;
  setSortOption: (option: string) => void;
  setSearchValue: (value: string) => void;
  searchValue: string;
};

type NameCardProps = GuestBookProps & {
  teamData: Team[];
  setTeamData: React.Dispatch<React.SetStateAction<Team[]>>;
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
    roomData,
    setRoomData,
    isEdit,
    isLoading,
    setSortOption,
    isNewData,
    setIsNewData,
    setIsCamera,
    setSearchValue,
    searchValue,
  } = props;

  const [selectedTeamBoxes, setSelectedTeamBoxes] = useState<number[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"selected" | "all" | null>(null);
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

  const handleDeleteSelected = async () => {
    /* 보관된 명함 삭제 (선택)) API */
    try {
      // 선택된 팀 Id
      const selectedTeamIds = selectedTeamBoxes.map(
        (index) => teamData[index].cardHolderId,
      );

      // 각 선택된 cardId에 대해 DELETE 요청 보내기
      const deleteRequests = selectedTeamIds.map((cardHolderId) =>
        instance.delete(`/api/storedCard/${cardHolderId}`),
      );

      // 모든 DELETE 요청을 병렬로 처리
      await Promise.all(deleteRequests);

      // 요청이 모두 완료되면 선택된 팀 박스를 초기화하고 모달을 닫기
      setSelectedTeamBoxes([]);
      setTeamData([]);
      setIsModal(false);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (toggleFav !== null) {
      const selectedTeam = teamData[toggleFav];
      if (!selectedTeam) return;

      setTeamData((prevData) =>
        prevData.map((team) =>
          team.cardHolderName === selectedTeam.cardHolderName
            ? { ...team, bookMark: !team.bookMark }
            : team,
        ),
      );
      /* 보관된 명함에 대한 즐겨찾기 PUT */
      const putFav = async () => {
        await put(`/api/storedCard/${selectedTeam.cardHolderId}`);
      };
      putFav();
    }
  }, [toggleFav]);

  const handleDeleteAll = async () => {
    try {
      /* 보관된 명함 삭제하기 (전체)  API */
      if (ver === "명함" && teamData) {
        const deleteRequests = teamData.map((data) =>
          instance.delete(`/api/storedCard/${data.cardHolderId}`),
        );
        await Promise.all(deleteRequests);

        setTeamData([]);
      } else if (ver === "방명록" && roomData) {
        /* 방명록 삭제하기  API */
        const deleteRequests = roomData.map((data) =>
          instance.delete(`/api/storedCard/${data.roomId}`),
        );
        await Promise.all(deleteRequests);
      }

      setSelectedTeamBoxes([]);
      setIsModal(false);
    } catch (e) {
      console.error(e);
    }
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
        />
        <div className="mb-[1.2rem] mt-[2.4rem] flex h-[3.6rem] w-full justify-between">
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-body-1-med text-gray-11">
              보관된 {ver === "명함" ? "명함" : "방명록"}
            </span>
            <span className="text-body-1-bold text-gray-7">
              {teamData.length}
            </span>
          </div>
          <Sorting
            deleteModal={deleteModal}
            setSortOption={setSortOption}
            isEdit={isEdit}
          />
        </div>
        <div className="flex w-full flex-col gap-[1.2rem]">
          {ver === "명함"
            ? teamData.map((team, index) => (
                <TeamBox
                  key={index}
                  isSelected={selectedTeamBoxes.includes(index)}
                  isEdit={isEdit}
                  onSelect={handleSelectTeamBox}
                  index={index}
                  setToggleFav={() => setToggleFav(index)}
                  isLoading={isLoading}
                  {...(ver === "명함" ? { isNewData, setIsNewData, team } : {})} // 명함일 때만 isNewData 전달
                  ver={ver}
                />
              ))
            : roomData?.map((room, index) => (
                <TeamBox
                  key={index}
                  isSelected={selectedTeamBoxes.includes(index)}
                  isEdit={isEdit}
                  onSelect={handleSelectTeamBox}
                  index={index}
                  setToggleFav={() => setToggleFav(index)}
                  isLoading={isLoading}
                  {...(ver === "방명록" ? { room, setRoomData } : {})}
                  ver={ver}
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
