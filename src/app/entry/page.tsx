"use client";

import SearchInput from "@/src/components/SearchInput";
import TeamRoomList from "@/src/components/entry/TeamRoomList";
import { useState } from "react";
import FindRoom from "@/src/components/entry/FindRoom";

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
  // const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<GameRoom[]>([]);

  // 방 검색하기 api

  const handleSearch = async () => {
    // api 연결 전 임시 함수
    setFilteredRooms([]);
    // try {
    //   const response = await axios.get(`/api/rooms`, {
    //     params: { search: searchValue }, // 검색어를 쿼리 매개변수로 전달
    //   });
    //   setFilteredRooms(response.data); // 검색 결과를 상태에 저장
    // } catch (err) {
    //   console.error("Error fetching team data:", err);
    // }
  };
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
        <FindRoom />
      )}
    </div>
  );
};

export default Entry;
