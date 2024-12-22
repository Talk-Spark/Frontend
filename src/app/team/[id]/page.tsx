"use client";
import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProfileImage from "@/src/components/ProfileImage";
// import axios from "axios";

interface Participant {
  name: string;
  color: "pink" | "green" | "yellow" | "blue";
  isHost: boolean;
}

interface GameRoomDetail {
  roomId: number;
  roomName: string;
  hostName: string;
  difficulty: number;
  maxPeople: number;
  participantsDetail: Participant[];
}

const TeamDetail = () => {
  const [user, setUser] = useState<{ name: string; id: number } | null>(null);
  // const { id } = useParams();
  const [teamData, setTeamData] = useState<GameRoomDetail | null>(null);
  const router = useRouter();

  const startGame = () => {
    router.push("/start");

    setTeamData(null); // api 함수 작성 후 삭제
  };

  const isUserHost = (roomDetail: GameRoomDetail) => {
    return roomDetail.participantsDetail.some(
      (participant) => participant.name === user?.name && participant.isHost,
    );
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); // 로그인한 사용자 정보 (localStorage 사용 예시)
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // 로그인 정보가 있다면 상태에 저장
    }
  }, []);

  // 방 정보 보기 api 요청
  // useEffect(() => {
  //   const fetchTeamData = async () => {
  //     if (id) {
  //       try {
  //         const response = await axios.get(`/api/rooms/${id}`);
  //         setTeamData(response.data);
  //       } catch (err) {
  //         console.error("Error fetching team data:", err);
  //       }
  //     }
  //   };

  //   fetchTeamData();
  // }, [id]);

  if (!teamData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[cal(100% + 4rem)] -mx-[2rem] h-[71.2rem] bg-gray-1 px-[2rem]">
      <div className="flex h-full flex-col justify-between gap-[21.2rem] pb-[6rem] pt-[2.4rem]">
        <div className="flex flex-col gap-[5.2rem]">
          <div className="flex justify-center">
            <div className="flex flex-col">
              <span className="text-center text-body-1-med text-gray-7">
                난이도 <span className="text-black">{teamData.difficulty}</span>
              </span>
              <span className="mb-[1.2rem] mt-[0.8rem] text-headline-3 text-black">
                {teamData.roomName}
              </span>
              <span className="text-center text-subhead-med">
                <span className="text-subhead-bold text-main-pink">
                  {teamData.participantsDetail.length}
                </span>{" "}
                / {teamData.maxPeople}
              </span>
            </div>
          </div>

          <div
            key={teamData.roomName}
            className="flex w-full flex-1 flex-wrap gap-x-[1.6rem] gap-y-[2rem] px-[0.75rem]"
          >
            {teamData.participantsDetail.map((participant, index) => (
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
        </div>
        {/* 로그인한 사용자가 방장일 경우 '시작하기' 버튼 */}
        {isUserHost(teamData) ? (
          <button
            onClick={startGame}
            className="w-full cursor-pointer rounded-[1.2rem] bg-main-pink py-[1.6rem] text-center text-subhead-bold text-white"
          >
            시작하기
          </button>
        ) : (
          <button
            disabled={true}
            className="w-full cursor-not-allowed rounded-[1.2rem] bg-gray-3 py-[1.5rem] text-center text-subhead-bold text-white"
          >
            시작을 기다리고 있어요
          </button>
        )}
      </div>
    </div>
  );
};
export default TeamDetail;
