"use client";
import Image from "next/image";
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
import { useRouter } from "next/navigation"; // 'next/navigation'에서 useRouter import
import axios from "axios";

// 방 타입 정의
interface GameRoom {
  roomId: number;
  roomName: string;
  hostName: string;
  participants: number;
}

const Entry = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  // 게임 방 목록 (기본 정보)
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<GameRoom[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/rooms`, {
        params: { search: searchValue }, // 검색어를 쿼리 매개변수로 전달
      });
      setFilteredRooms(response.data); // 검색 결과를 상태에 저장
    } catch (err) {
      console.error("Error fetching team data:", err);
    }
  };

  // 방 검색하기 api
  // useEffect(() => {
  //   const fetchGameRooms = async () => {
  //     try {
  //       const response = await axios.get(`/api/rooms`);
  //       setGameRooms(response.data); // 기본 방 목록 설정
  //       setFilteredRooms(response.data); // 필터링된 목록도 초기화
  //     } catch (err) {
  //       console.error("Error fetching game rooms:", err);
  //     }
  //   };

  //   fetchGameRooms();
  // }, []);

  return (
    <div className="w-full">
      <div className="my-[2.4rem] my-[2rem] flex flex-col">
        <span className="text-headline-3 text-black">팀 방 찾기</span>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholderText={"팀 방 검색"}
          isQr={true}
          onSearch={handleSearch}
        />
      </div>
      {filteredRooms.length > 0 ? (
        <TeamRoomList gameRooms={filteredRooms} />
      ) : (
        <div className="mt-[5.2rem] flex justify-center pl-[3.5rem] pr-[2rem] pt-[3rem] text-gray-10">
          <div className="relative flex h-[30rem] w-[28rem] flex-col items-center justify-center gap-[2.1rem]">
            <span className="z-0 text-graphic-font">우리 팀을 찾아보아요~</span>
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
  );
};

export default Entry;
