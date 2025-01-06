"use client";
import { instance } from "@/src/apis";
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
  };

  type RoomData = {
    roomId: number;
    roomName: string;
    roomDateTime: string;
    roomPeopleCount: number;
    guestBookFavorited: boolean;
    preViewContent: string;
  };

  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [idToggle, setIdToggle] = useState(0);

  /* 정렬 조건에 따른 방명록 검색하기 */
  useEffect(() => {
    const fetchGuestBooks = async () => {
      if (isLoading) return;

      try {
        setIsLoading(true);

        // API 응답 타입 정의
        type ApiResponse = {
          guestBookRooms: RoomData[];
        };

        // 쿼리 파라미터 생성 함수
        const getQueryParam = () => {
          const params = new URLSearchParams();

          // 검색어 추가
          if (searchValue) params.append("search", searchValue);

          // 정렬 옵션 추가
          if (sortOption === "즐겨찾기") params.append("sortBy", "favorites");
          else if (sortOption === "가나다순")
            params.append("sortBy", "alphabetical");
          // 최신순은 기본값이므로 추가하지 않음

          return params.toString() ? `?${params.toString()}` : "";
        };

        // API 호출
        const queryParam = getQueryParam();
        const response = await instance.get(`/api/guest-books${queryParam}`);

        // 응답 데이터가 올바른 형식인지 확인
        const data = response.data as ApiResponse;

        if (data && data.guestBookRooms) {
          setRoomData(data.guestBookRooms); // 응답 데이터를 RoomData 형식으로 설정
        }
      } catch (error) {
        console.error("Error fetching guest books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuestBooks();
  }, [sortOption, searchValue]); // 종속성 배열에 roomData는 필요하지 않음

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
        idToggle={idToggle}
        setIdToggle={setIdToggle}
      />
    </div>
  );
};
export default Page;
