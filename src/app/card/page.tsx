"use client";

import React from "react";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import MyCard from "@/src/components/Storage/card/MyCard";
import ToggleBar from "@/src/components/Storage/ToggleBar";
import Header from "@/src/components/Headers/Header";
import Logout from "@/src/components/Storage/Logout";
import Modal from "@/src/components/common/Modal";
import ReadCode from "@/src/components/QrCode/ReadCode";
import { get, instance } from "@/src/apis";
import Template from "@/src/components/Router/template";
import { useRouterWrapper } from "@/src/components/Router/RouterWrapperProvider";

export type CardHolderResponse = {
  cardHolderId: number;
  cardHolderName: string;
  numOfTeammates: number;
  teamNames: string[];
  bookMark: boolean;
  storedAt: string;
};

const Card = () => {
  const router = useRouterWrapper();
  const searchParams = useSearchParams();

  const viewParam = searchParams.get("view"); // "mine" 또는 "others" 가져오기
  const [sortOption, setSortOption] = useState("최신순");
  const [searchValue, setSearchValue] = useState<string>("");
  const [myRun, setMyRun] = useState<{
    cardId: number;
    name: string;
  } | null>(null);

  const [teamData, setTeamData] = useState<CardHolderResponse[]>([]);

  const [activeView, setActiveView] = useState<"mine" | "others">(
    viewParam === "others" ? "others" : "mine",
  ); // 초기값 설정
  const [isVisible, setIsVisible] = useState(false); //
  const [isEdit, setIsEdit] = useState<"edit" | "complete">("edit");
  const [isModalVisible, setIsModalVisible] = useState(false); // 로그아웃 | 회원탈퇴 모달
  const [modalAction, setModalAction] = useState<"logout" | "delete" | null>(
    null,
  );
  const [confirmModal, setConfirmModal] = useState(false); // 확정 모달
  const [isCamera, setIsCamera] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeamBoxes, setSelectedTeamBoxes] = useState<number[]>([]); // 선택 박스
  const [idToggle, setIdToggle] = useState(0);

  /* 정렬 조건에 따른 명함 보관함 속 명함 조회 */
  useEffect(() => {
    const fetchStoredCards = async () => {
      if (!isLoading) {
        try {
          setIsLoading(true);
          // API 응답 타입 정의
          type ApiResponse = {
            data: {
              cardHolders: CardHolderResponse[];
            };
          };

          // API 호출

          // 쿼리 파라미터 생성 함수
          const getQueryParam = () => {
            if (sortOption === "즐겨찾기") return "?searchType=Bookmark";
            if (sortOption === "가나다순") return "?searchType=Alphabet";
            return ""; // 최신순 기본값
          };

          const queryParam = getQueryParam();
          const response = await get(`/api/storedCards${queryParam}`);
          // 데이터 잘 들어옴
          // 응답 데이터가 올바른 형식인지 확인
          const resData = response.data as ApiResponse;
          const data = resData.data;
          if (data?.cardHolders) {
            setTeamData(data.cardHolders);
          } else {
            console.log("cardHolders 속성을 찾을 수 없습니다.");
          }

          // 큐알을 통한 새로운 데이터
          if (isNewData) {
            setIsNewData(true);
            setIsCamera(false);
          }
        } catch (error) {
          console.log("Error fetching stored cards:", error);
          setTeamData([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    if (!searchValue) {
      fetchStoredCards();
    }
  }, [sortOption, searchValue, isNewData, selectedTeamBoxes]);

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
    if (activeView === "mine") {
      handleToggle("mine");
    }
  }, [searchParams]);

  const handleCompleteClick = () => {
    if (activeView === "mine") {
      setIsModalVisible((prev) => !prev);
    } else {
      setIsEdit((prev) => (prev === "edit" ? "complete" : "edit"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const userObj = JSON.parse(user);
        } catch (e) {
          console.log("Failed to parse user from localStorage", e);
        }
      }
    }
  }, []);

  const getAccessToken = (): string | null => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userObj = JSON.parse(user);
        return userObj.accessToken || "";
      } catch (e) {
        console.log("Failed to parse user from localStorage", e);
        return "";
      }
    }
    return "";
  };

  const handleCloseModal = async () => {
    if (modalAction === "logout") {
      // 로그아웃 -> 로컬스토리지 user 객체 전체 삭제
      localStorage.removeItem("user");
    } else if (modalAction === "delete") {
      const user = localStorage.getItem("user");
      if (user) {
        /* 회원탈퇴 API */
        try {
          const token = getAccessToken();
          const response = await instance.delete(
            `/api/member/leave?accessToken=${token}`,
          );
          if (response.status === 200) {
            console.log("회원 탈퇴 성공:", response.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    router.push("/login"); // 로그인 페이지으로 이동
  };

  const mineSettingBtn: "settings" | "edit" | "complete" =
    activeView === "mine" ? "settings" : isEdit;

  const headerTitle = isCamera ? "명함 추가하기" : "명함 보관함";
  const headerBtn2 = isCamera ? "" : mineSettingBtn;

  const headerBtn1 = () => {
    const cardDetail = JSON.parse(
      localStorage.getItem("cardDetail") || "false",
    );
    if (isCamera) {
      setIsCamera(false);
    } else if (!cardDetail) {
      router.back();
    } else {
      router.push("/home");
      localStorage.setItem("cardDetail", JSON.stringify(false));
    }
  };

  return (
    <Template>
      <div className="relative -mx-[2rem] w-[calc(100%+4rem)]">
        <div className="mb-[0.4rem]">
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
          <div className="relative flex flex-col items-center">
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
                  ? "재가입 시에도 이용 내역이 복구되지 않아요"
                  : "로그인 상태여야 서비스를 이용할 수 있어요"
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
                ver="명함"
                teamData={teamData}
                setTeamData={setTeamData}
                isEdit={isEdit}
                isLoading={isLoading}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setSortOption={setSortOption}
                selectedTeamBoxes={selectedTeamBoxes}
                setSelectedTeamBoxes={setSelectedTeamBoxes}
                idToggle={idToggle}
                setIdToggle={setIdToggle}
                setIsCamera={setIsCamera}
                isNewData={isNewData}
                setIsNewData={setIsNewData}
              />
            ) : (
              <MyCard isVisible={isVisible} />
            )}
          </div>
        )}
      </div>
    </Template>
  );
};

export default function PageWithSuspense() {
  return (
    <Suspense>
      <Card />
    </Suspense>
  );
}
