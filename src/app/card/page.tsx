"use client";

import { useState } from "react";
// import { useSearchParams } from "next/navigation";
import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import MyCard from "@/src/components/Storage/MyCard";
import ToggleBar from "@/src/components/Storage/ToggleBar";
import Header from "@/src/components/Headers/Header";
import Logout from "@/src/components/Storage/Logout";
import Modal from "@/src/components/common/Modal";
import ReadCode from "@/src/components/QrCode/ReadCode";

const Card = () => {
  const [myRun, setMyRun] = useState<{
    cardId: number;
    name: string;
  } | null>(null);

  type TeamData = {
    teamName: string;
    teamPeopleCount: number;
    cardDate: string;
    participants: string;
    isFav: boolean;
  };

  const [teamData, setTeamData] = useState<TeamData[]>([]);

  // useEffect(() => {
  //   const fetchStoredCards = async () => {
  //     try {
  //       setIsLoading(true);
  //       // API 응답 타입 정의
  //       type CardHolderResponse = {
  //         cardHolderName: string;
  //         teamNames: string[];
  //         bookMark: boolean;
  //         storedAt: string;
  //       };

  //       type ApiResponse = {
  //         cardHolders: CardHolderResponse[];
  //       };

  //       // API 호출
  //       const response = await get("/api/storedCards");

  //       // 응답 데이터가 올바른 형식인지 확인
  //       const data = response.data as ApiResponse;

  //       if (data && data.cardHolders) {
  //         // 응답 데이터를 TeamData 형식으로 변환
  //         const formattedData: TeamData[] = data.cardHolders.map((item) => ({
  //           teamName: item.cardHolderName,
  //           teamPeopleCount: item.teamNames.length || 0,
  //           cardDate: item.storedAt,
  //           participants: item.teamNames.join(" "),
  //           isFav: item.bookMark,
  //         }));
  //         setTeamData(formattedData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching stored cards:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchStoredCards();
  // }, []);

  const [activeView, setActiveView] = useState<"mine" | "others">("others");
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState<"edit" | "complete">("edit");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<"logout" | "delete" | null>(
    null,
  );
  const [confirmModal, setConfirmModal] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  // const [user, setUser] = useState<{ name: string; id: number } | null>(null);
  const [isNewData, setIsNewData] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (view: "mine" | "others") => {
    setActiveView(view);
    if (view === "mine") {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user"); // 로그인한 사용자 정보 (localStorage 사용 예시)
  //   if (loggedInUser) {
  //     setUser(JSON.parse(loggedInUser)); // 로그인 정보가 있다면 상태에 저장
  //   }
  // }, []);

  // Qr인식시 개인 명함 post
  // useEffect(() => {
  //   const getResponse = async () => {
  //     if (!myRun || !user?.id) return;
  //     const requestData = {
  //       storeType: "IND",
  //       name: myRun?.name,
  //       cardId: myRun?.cardId,
  //       sparkUserId: user?.id,
  //     };

  //     try {
  //       const response = await post("/api/store/ind", requestData);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getResponse();
  // }, [myRun]);

  const handleCompleteClick = () => {
    if (activeView === "mine") {
      setIsModalVisible((prev) => !prev);
    } else {
      setIsEdit((prev) => (prev === "edit" ? "complete" : "edit"));
    }
  };

  const handleCloseModal = () => {
    if (!confirmModal) {
      setConfirmModal(false);
    }

    setIsModalVisible(false);
  };

  const mineSettingBtn: "settings" | "edit" | "complete" =
    activeView === "mine" ? "settings" : isEdit;

  const headerTitle = isCamera ? "명함 추가하기" : "명함 보관함";
  const headerBtn2 = isCamera ? "" : mineSettingBtn;
  const headerBtn1 = () => {
    if (isCamera) {
      setIsCamera(false);
    } else {
      window.history.back();
    }
  };

  return (
    <>
      <div className="-mx-[2rem] w-[calc(100%+4rem)]">
        <Header
          title={headerTitle}
          padding={true}
          showButton1={true}
          button1Action={headerBtn1}
          button2Type={headerBtn2}
          button2Action={handleCompleteClick}
        />
      </div>
      {isCamera ? (
        <ReadCode
          myRun={myRun}
          setMyRun={setMyRun}
          setIsNewData={setIsNewData}
          setIsCamera={setIsCamera}
          qrVer="room"
        />
      ) : (
        <div className="relative -mx-[2rem] flex w-[calc(100%+4rem)] flex-col items-center">
          <Modal
            isOpen={confirmModal}
            onClose={() => setConfirmModal(false)}
            onAction={handleCloseModal}
            title={
              modalAction === "delete"
                ? "회원 탈퇴 하시겠어요?"
                : "로그아웃 하시겠어요?"
            }
            description={
              modalAction === "delete"
                ? "로그인 상태여야 서비스를 이용할 수 있어요"
                : "재가입 시에도 이용 내역이 복구되지 않아요"
            }
            actionText="돌아가기"
            buttonText={modalAction === "delete" ? "탈퇴하기" : "로그아웃"}
          />
          {activeView === "mine" && isModalVisible && (
            <Logout
              modalAction={modalAction}
              setModalAction={setModalAction}
              setConfirmModal={setConfirmModal}
            />
          )}
          <ToggleBar handleToggle={handleToggle} activeView={activeView} />
          {activeView === "others" ? (
            <SearchAndGetCard
              teamData={teamData}
              setTeamData={setTeamData}
              ver={"명함"}
              isEdit={isEdit}
              setIsCamera={setIsCamera}
              isNewData={isNewData}
              setIsNewData={setIsNewData}
              // isLoading={isLoading}
            />
          ) : (
            <MyCard isVisible={isVisible} />
          )}
        </div>
      )}
    </>
  );
};

export default Card;
