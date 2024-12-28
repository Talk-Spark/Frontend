"use client";
import Header from "@/src/components/Headers/Header";
import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import { useEffect, useState } from "react";

const Page = () => {
  const [isEdit, setIsEdit] = useState<"edit" | "complete">("edit");
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleCompleteClick = () => {
    setIsEdit((prev) => (prev === "edit" ? "complete" : "edit"));
    setIsLoading(false); // api 연결 시 삭제
  };

  type RoomData = {
    roomId: number;
    roomName: string;
    roomPeopleCount: number;
    roomDateTime: string;
    guestBookData: string[];
    guestBookFavorited: boolean;
  };

  const [roomData, setRoomData] = useState<RoomData[]>([]);

  /* 정렬 조건에 따른 명함 보관함 속 명함 조회 */
  useEffect(() => {
    // const fetchStoredCards = async () => {
    //   if (!isLoading) {
    //     try {
    //       setIsLoading(true);
    //       // API 응답 타입 정의
    //       type ApiResponse = {
    //         cardHolders: RoomData[];
    //       };
    //       // API 호출
    //       // 쿼리 파라미터로 정렬 조건 추가
    //       const queryParam = sortOption ? `?sort=${sortOption}` : "";
    //       const response = await get(`/api/storedCards${queryParam}`);
    //       // 응답 데이터가 올바른 형식인지 확인
    //       const data = response.data as ApiResponse;
    //       if (data && data.cardHolders) {
    //         // 응답 데이터를 TeamData 형식으로 변환
    //         setRoomData(data.cardHolders);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching stored cards:", error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   }
    // };
    // fetchStoredCards();
  }, [sortOption, roomData, searchValue]);

  return (
    <div className="-mx-[2rem] w-[calc(100%+4rem)]">
      <Header
        title="방명록 보관함"
        button2Type={isEdit}
        button2Action={handleCompleteClick}
        padding={true}
        showButton1={true}
      />{" "}
      <SearchAndGetCard
        ver="방명록"
        setRoomData={setRoomData}
        roomData={roomData}
        isEdit={isEdit}
        isLoading={isLoading}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSortOption={setSortOption}
      />
    </div>
  );
};
export default Page;
