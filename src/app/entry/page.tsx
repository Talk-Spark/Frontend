"use client";
import Header from "@/src/components/Headers/Header";
import Image from "next/image";
import arrowIcon from "@/public/entry/arrowLeft.svg";
import searchGraphic from "@/public/entry/searchGraphic.svg";
import starPink from "@/public/entry/starPink.svg";
import starBlue from "@/public/entry/starBlue.svg";
import starMint from "@/public/entry/starMint.svg";
import starYellow from "@/public/entry/starYellow.svg";
import Camera from "@/src/components/entry/Camera";
import SearchInput from "@/src/components/SearchInput";
import TeamRoomList from "@/src/components/entry/TeamRoomList";

import { useEffect, useState } from "react";
import ProfileImage from "@/src/components/ProfileImage";

// 방 타입 정의
interface GameRoom {
  roomName: string; // 방 이름
  hostName: string; // 방장 이름
  participants: number; // 참가자 수
}

// 참가자 상세 정보 포함하는 타입 정의
interface GameRoomDetail {
  roomName: string; // 방 이름
  hostName: string; // 방장 이름
  participantsDetail: {
    name: string; // 참가자 이름
    color: "pink" | "green" | "yellow" | "blue"; // 참가자 색상
    isHost: boolean;
  }[]; // 참가자 리스트
}

const Entry = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false); // 대기실 UI 위해 임시 상태

  const [user, setUser] = useState<{ name: string; id: string } | null>(null);

  // 예시: 로그인 후 사용자의 이름이나 ID를 설정
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); // 로그인한 사용자 정보 (localStorage 사용 예시)
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // 로그인 정보가 있다면 상태에 저장
    }
  }, []);

  const isUserHost = (roomDetail: GameRoomDetail) => {
    return roomDetail.participantsDetail.some(
      (participant) => participant.name === user?.name && participant.isHost,
    );
  };

  // 게임 방 목록 (기본 정보)
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([
    {
      roomName: "멋쟁이 데모팀",
      hostName: "진예원",
      participants: 9,
    },
    {
      roomName: "팀 이름",
      hostName: "최정인",
      participants: 12,
    },
  ]);

  // 게임 방 상세 정보
  const [gameRoomDetail, setGameRoomDetail] = useState<GameRoomDetail[]>([
    {
      roomName: "멋쟁이 데모팀",
      hostName: "진예원",
      participantsDetail: [
        { name: "최정인", color: "pink", isHost: false },
        { name: "홍길동", color: "green", isHost: false },
        { name: "김철수", color: "blue", isHost: false },
        { name: "이영희", color: "yellow", isHost: false },
        { name: "홍길동", color: "green", isHost: false },
        { name: "김철수", color: "blue", isHost: false },
        { name: "이영희", color: "yellow", isHost: false },
      ],
    },
    {
      roomName: "팀 이름",
      hostName: "최정인",
      participantsDetail: [],
    },
  ]);

  // 대기실로 이동하는 함수
  const onClickWaiting = () => {
    setIsWaiting(true);
  };

  return (
    <div className="xs:p-0 w-full">
      <Header title="입장하기" showButton1={true} />

      {isWaiting ? (
        
        /* 대기실 퍼블리싱 */
        <div className="bg-gray-1">
          <div className="mx-[2rem] flex flex-col gap-[21.2rem] pb-[6rem] pt-[2.4rem]">
            <div className="flex flex-col gap-[5.2rem]">
              <div className="flex justify-center">
                <div className="flex flex-col">
                  <span className="text-center text-body-1-med text-gray-7">
                    난이도 <span className="text-black">중</span>
                  </span>
                  <span className="mb-[1.2rem] mt-[0.8rem] text-headline-3 text-black">
                    멋쟁이 데모팀
                  </span>
                  <span className="text-center text-subhead-med">
                    <span className="text-subhead-bold text-main-pink">5</span>{" "}
                    / 7
                  </span>
                </div>
              </div>
              <div>
                {gameRoomDetail.map((roomDetail) => (
                  <div
                    key={roomDetail.roomName}
                    className="flex w-full flex-1 flex-wrap gap-x-[1.6rem] gap-y-[2rem] px-[0.75rem]"
                  >
                    {roomDetail.participantsDetail.map((participant, index) => (
                      <div
                        key={index}
                        className="max-w-[(100%-4.8rem)/4] flex-1"
                        style={{ maxWidth: "calc((100% - 4.8rem) / 4)" }}
                      >
                        <ProfileImage color={participant.color}>
                          {participant.name}
                        </ProfileImage>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* 로그인한 사용자가 방장일 경우 '시작하기' 버튼 */}
            {gameRoomDetail.some((room) => isUserHost(room)) ? (
              <button className="w-full cursor-pointer rounded-[1.2rem] bg-main-pink py-[1.6rem] text-center text-subhead-bold text-white">
                시작하기
              </button>
            ) : (
              // 방장이 아니라면 '기다리고 있어요' 버튼
              <button
                disabled={true} // 버튼을 비활성화
                className="w-full cursor-not-allowed rounded-[1.2rem] bg-gray-3 py-[1.5rem] text-center text-subhead-bold text-white"
              >
                시작을 기다리고 있어요
              </button>
            )}
          </div>
        </div>
      ) : !isOn ? (
        <div>
          <div className="my-[2.4rem] my-[2rem] flex flex-col">
            <span className="text-headline-3 text-black">팀 방 찾기</span>
            <SearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setIsOn={setIsOn}
              placeholderText={"팀 방 검색"}
              isQr={true}
            />
          </div>
          {gameRooms.length > 0 ? (
            <TeamRoomList
              gameRooms={gameRooms}
              onClickWaiting={onClickWaiting}
            />
          ) : (
            <div className="mt-[5.2rem] flex justify-center pl-[3.5rem] pr-[2rem] pt-[3rem] text-gray-10">
              <div className="relative flex h-[30rem] w-[28rem] flex-col items-center justify-center gap-[2.1rem]">
                <span className="text-graphic-font z-0">
                  우리 팀을 찾아보아요~
                </span>
                <Image
                  src={searchGraphic}
                  alt="검색 그래픽"
                  width={145}
                  className="relative z-20"
                />
                <Image
                  src={starPink}
                  alt="핑크별 이미지"
                  className="absolute -right-[2rem] top-[12rem] z-10"
                />
                <Image
                  src={starBlue}
                  alt="블루별 이미지"
                  className="absolute -top-[1rem] right-[1rem] z-10"
                />
                <Image
                  src={starMint}
                  alt="민트별 이미지"
                  className="absolute right-[21rem] top-[18rem] z-10"
                />
                <Image
                  src={starYellow}
                  alt="엘로우별 이미지"
                  className="absolute right-[13rem] top-[3rem] z-10"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setIsOn(false)}>
          <Camera />
        </div>
      )}
    </div>
  );
};

export default Entry;
