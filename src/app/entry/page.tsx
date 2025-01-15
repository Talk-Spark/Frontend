"use client";

import SearchInput from "@/src/components/SearchInput";
import TeamRoomList from "@/src/components/entry/TeamRoomList";
import { useEffect, useState } from "react";
import FindRoom from "@/src/components/entry/FindRoom";
import { instance } from "@/src/apis";
import ReadCode from "@/src/components/QrCode/ReadCode";
import Header from "@/src/components/Headers/Header";
import { useSearchParams } from "next/navigation";

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
  const [isCamera, setIsCamera] = useState(false);
  const [myRun, setMyRun] = useState<{
    cardId: number;
    name: string;
  } | null>(null);

  // useEffect(() => {
  //   localStorage.removeItem("isGameHost"); //entry를 통해 접근하는 사람은 방장이 아닌 것으로 치부.
  // }, []);

  const setIsNewData = () => {};

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

  const headerBtn1 = () => {
    if (isCamera) {
      setIsCamera(false);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="w-full">
      <Header
        showButton1={true}
        button1Action={headerBtn1}
        title="입장하기"
        padding={false}
      />

      {isCamera && (
        <div className="w-[calc(100%+4rem) -mx-[2rem]">
          <ReadCode
            myRun={myRun}
            setMyRun={setMyRun}
            setIsCamera={setIsCamera}
            setIsNewData={setIsNewData}
            qrVer="room"
          />
        </div>
      )}
      <div className="my-[2.4rem] my-[2rem] flex flex-col">
        <span className="text-headline-3 text-black">팀 방 찾기</span>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholderText={"팀 방 검색"}
          isQr={true}
          setIsCamera={setIsCamera}
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
