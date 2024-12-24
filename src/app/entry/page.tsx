"use client";

import SearchInput from "@/src/components/SearchInput";
import TeamRoomList from "@/src/components/entry/TeamRoomList";
import { useState } from "react";
import FindRoom from "@/src/components/entry/FindRoom";
import { instance } from "@/src/apis";

// 방 타입 정의
interface GameRoom {
  roomId: number;
  roomName: string;
  hostName: string;
  currentPeople: number;
  maxPeople: number;
}

const Entry = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [filteredRooms, setFilteredRooms] = useState<GameRoom[]>([]);

  // 방 검색하기 api

  const handleSearch = async () => {
    setFilteredRooms([]);
    try {
      const response = await instance.get("/api/rooms", {
        params: { searchName: searchValue }, // 검색어를 쿼리 매개변수로 전달
      });
      setFilteredRooms(response.data);
    } catch (err) {
      console.error("Error fetching team data:", err);
    }
  };

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
        <FindRoom findText={"우리 팀을 찾아보아요~"} />
      )}
    </div>
  );
};

export default Entry;
