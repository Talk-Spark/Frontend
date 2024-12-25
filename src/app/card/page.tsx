"use client";

import { useEffect, useState } from "react";
import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import MyCard from "@/src/components/Storage/MyCard";
import ToggleBar from "@/src/components/Storage/ToggleBar";
import Header from "@/src/components/Headers/Header";
import Logout from "@/src/components/Storage/Logout";
import Modal from "@/src/components/common/Modal";
import ReadCode from "@/src/components/QrCode/ReadCode";
import { get, instance } from "@/src/apis";
import { useRouter } from "next/navigation";

type CardHolderResponse = {
  cardHolderId: number;
  cardHolderName: string;
  teamNames: string[];
  bookMark: boolean;
  storedAt: string;
};

const Card = () => {
  const router = useRouter();
  const [myRun, setMyRun] = useState<{
    cardId: number;
    name: string;
  } | null>(null);

  type TeamData = {
    cardId: number;
    teamName: string;
    teamPeopleCount: number;
    cardDate: string;
    participants: string;
    isFav: boolean;
  };

  const [teamData, setTeamData] = useState<TeamData[]>([
    {
      cardId: 3,
      teamName: "박승범",
      participants: "박승범",
      teamPeopleCount: 1,
      isFav: false,
      cardDate: "2024-12-25T14:25:30.100464",
    },
    {
      cardId: 2,
      teamName: "멋사 2팀",
      participants: "박승범 박승범 박승범",
      teamPeopleCount: 3,
      isFav: false,
      cardDate: "2024-12-25T14:23:32.260408",
    },
  ]);

  /* 정렬 조건에 따른 명함 보관함 속 명함 조회 */
  useEffect(() => {
    const fetchStoredCards = async () => {
      if (!isLoading) {
        try {
          setIsLoading(true);
          // API 응답 타입 정의
          type ApiResponse = {
            cardHolders: CardHolderResponse[];
          };

          // API 호출
          const response = await get("/api/storedCards");

          // 응답 데이터가 올바른 형식인지 확인
          const data = response.data as ApiResponse;

          if (data && data.cardHolders) {
            // 응답 데이터를 TeamData 형식으로 변환
            const formattedData: TeamData[] = data.cardHolders.map((item) => ({
              cardId: item.cardHolderId,
              teamName: item.cardHolderName,
              teamPeopleCount: item.teamNames.length || 0,
              cardDate: item.storedAt,
              participants: item.teamNames.join(" "),
              isFav: item.bookMark,
            }));
            setTeamData(formattedData);
          }
        } catch (error) {
          console.error("Error fetching stored cards:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStoredCards();
  }, []);

  const [activeView, setActiveView] = useState<"mine" | "others">("others");
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState<"edit" | "complete">("edit");
  const [isModalVisible, setIsModalVisible] = useState(false); // 로그아웃 | 회원탈퇴 모달
  const [modalAction, setModalAction] = useState<"logout" | "delete" | null>(
    null,
  );
  const [confirmModal, setConfirmModal] = useState(false); // 확정 모달
  const [isCamera, setIsCamera] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (view: "mine" | "others") => {
    setActiveView(view);
    if (view === "mine") {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  };

  const handleCompleteClick = () => {
    if (activeView === "mine") {
      setIsModalVisible((prev) => !prev);
    } else {
      setIsEdit((prev) => (prev === "edit" ? "complete" : "edit"));
    }
  };

  const handleCloseModal = async () => {
    if (modalAction === "logout") {
      // 로그아웃 -> 로컬스토리지 user 객체 전체 삭제
      localStorage.removeItem("user");
    } else if (modalAction === "delete") {
      /* 회원탈퇴 API */
      try {
        await instance.delete("/api/member/leave");
      } catch (e) {
        console.log(e);
      }
    }
    router.push("/"); // 메인 홈으로 이동
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
        <div className="-mx-[2rem] w-[calc(100%+4rem)]">
          <ReadCode
            myRun={myRun}
            setMyRun={setMyRun}
            setIsNewData={setIsNewData}
            setIsCamera={setIsCamera}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            qrVer="card"
          />
        </div>
      ) : (
        <div className="relative -mx-[2rem] flex w-[calc(100%+4rem)] flex-col items-center">
          <Modal
            isOpen={confirmModal}
            onAction={() => setConfirmModal(false)}
            onClose={handleCloseModal}
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
              isLoading={isLoading}
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
