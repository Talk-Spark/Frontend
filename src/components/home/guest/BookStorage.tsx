// 방명록 저장소
import { useEffect, useState } from "react";
import GuestBookComponent from "./GuestBookComponent";
import { instance } from "@/src/apis";

// export interface GuestBookMessage {
//   id: number;
//   author: string;
//   message: string;
//   createdAt: string;
// }

// interface TeamGuestBook {
//   teamName: string; // 팀 이름
//   // messages: GuestBookMessage[]; // 방명록 목록
//   messages: string;
// }

export interface GuestBookRoom {
  roomId: number;
  roomName: string;
  roomDateTime: string;
  roomPeopleCount: number;
  guestBookFavorited: boolean;
  preViewContent: string;
}

const BookStorage = () => {
  // 더미 데이터
  // const teams: TeamGuestBook[] = [
  //   {
  //     teamName: "1팀",
  //     messages: [
  //       {
  //         id: 1,
  //         author: "방문자A",
  //         message: "프로젝트 너무 멋있어요! 화이팅하세요 👍",
  //         createdAt: "2024-03-15T10:30:00",
  //       },
  //       {
  //         id: 2,
  //         author: "익명의 개발자",
  //         message: "코드가 정말 깔끔하네요. 배울 점이 많았습니다.",
  //         createdAt: "2024-03-15T11:20:00",
  //       },
  //     ],
  //   },
  //   {
  //     teamName: "2팀",
  //     messages: [
  //       {
  //         id: 3,
  //         author: "디자이너B",
  //         message: "UI/UX가 정말 사용자 친화적이에요!",
  //         createdAt: "2024-03-15T09:15:00",
  //       },
  //       {
  //         id: 4,
  //         author: "후배C",
  //         message: "선배님들 멋있어요~ 저도 열심히 할게요!",
  //         createdAt: "2024-03-15T14:20:00",
  //       },
  //     ],
  //   },
  //   {
  //     teamName: "3팀",
  //     messages: [
  //       {
  //         id: 5,
  //         author: "기획자D",
  //         message: "기획의도가 잘 반영된 것 같아요. 수고하셨습니다!",
  //         createdAt: "2024-03-15T13:45:00",
  //       },
  //     ],
  //   },
  //   {
  //     teamName: "4팀",
  //     messages: [
  //       {
  //         id: 6,
  //         author: "PM님",
  //         message: "프로젝트 잘 진행되고 있네요. 좋은 결과 기대할게요!",
  //         createdAt: "2024-03-15T16:30:00",
  //       },
  //       {
  //         id: 7,
  //         author: "익명",
  //         message: "아이디어가 참신해요! 앞으로가 기대됩니다 ⭐️",
  //         createdAt: "2024-03-15T17:10:00",
  //       },
  //     ],
  //   },
  // ];

  const [guestBookRooms, setGuestBookRooms] = useState<GuestBookRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuestBookRooms = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/api/guest-books", {
        params: {
          search: "",
          sortBy: "latest",
        },
      });

      // console.log("response: ", response);

      if (response.status === 200) {
        setGuestBookRooms(response.data.data.guestBookRooms);
        setError(null);
      } else {
        setError("방명록 데이터를 가져오지 못했습니다.");
      }
    } catch (error) {
      setError("방명록 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestBookRooms();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex gap-[1.6rem] overflow-x-auto">
      {/* 최대 5개 렌더링 */}
      {/* {teams.slice(0, 5).map((team) => (
        <div key={team.teamName}>
          <GuestBookComponent name={team.teamName} messages={team.messages} />
        </div>
      ))} */}
      {guestBookRooms.slice(0, 5).map((room) => (
        <div key={room.roomId}>
          <GuestBookComponent
            name={room.roomName}
            messages={room.preViewContent}
          />
        </div>
      ))}
    </div>
  );
};

export default BookStorage;
