"use client";
import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
import { useParams } from "next/navigation";
import ProfileImage from "@/src/components/ProfileImage";
import FindRoom from "@/src/components/entry/FindRoom";
import { Start } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import { get } from "@/src/apis";
import { io, Socket } from "socket.io-client";
import { getUserData } from "@/src/utils";

//  참가자들 정보
interface Participant {
  name: string;
  color: "pink" | "green" | "yellow" | "blue";
  isOwner: boolean;
}

/* 방 정보 보기 요청 interface (웹소켓 : response에 맞게 수정하시면 됩니다) */
interface GameRoomDetail {
  roomId: number;
  roomName: string;
  hostName: string;
  difficulty: number;
  maxPeople: number;
  participantsDetail: Participant[];
}

const TeamDetail = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const { id } = useParams(); // roomId 파라미터 가져온 후 get
  const [teamData, setTeamData] = useState<GameRoomDetail | null>(null);
  const [isLottie, setIsLottie] = useState(false);

  const startGame = () => {
    setIsLottie(true);
  };

  const isUserHost = (roomDetail: GameRoomDetail) => {
    // 방장 정보와 일치할 때 해당 유저는 시작하기 버튼 활성화
    return roomDetail.participantsDetail.some(
      (participant) => participant.name === user?.name && participant.isOwner,
    );
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); // 로그인한 사용자 정보 (localStorage 사용 예시)
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // 로그인 정보가 있다면 상태에 저장
    }
  }, []);

  /*
  방에 입장했을 때 소켓 연결 및 joinRoom 메세지 전송
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("https://talkspark-dev-api.p-e.kr/socket.io/", {
      transports: ["websocket"],
    });

    //이 2가지 과정은 적절하게 위치 옮길 필요 존재.
    socketRef.current.emit("joinRoom", { roomId, accessToken, isHost });
    socketRef.current.on("roomUpdate", (info) => {
      //info 객체를 가지고 적절한 동작 수행! (방을 세팅하는)
      {
        "name": "사람이름",
        "isOwner": false // 방장이면 true, 아니면 false
        "userId" //아마 이것도 추가로 넘겨준다고 했음
      },
      ...
    });

    //그리고 방장 여부는 받아오기
    get("/api/rooms/host");

    //방 퇴장 시
    socketRef.current.emit("leaveRoom", { roomId, accessToken, isHost });
    socketRef.current.disconnect();

    //(only 방장) 게임 시작 버튼
  const handleStartGame = (roomId: string) => {
    socketRef.current?.emit("startGame", { roomId });
  };

  socketRef.current?.on("startGame", () => {
    //startGame을 보내고, 그에 대한 응답이 왔을 시 flow로 넘어가는 로직
    router.push("/flow/방아이디 어쩌구")
  });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
*/

  /* 방 정보 보기 api 요청 웹소켓 수정 필요 */
  useEffect(() => {
    // const fetchTeamData = async () => {
    //   if (id) {
    //     try {
    //       const response: AxiosResponse<GameRoomDetail> = await get(
    //         `/api/rooms/${id}`,
    //       ); // AxiosResponse<GameRoomDetail> 타입 지정
    //       setTeamData(response.data);
    //     } catch (err) {
    //       console.error("Error fetching team data:", err);
    //     }
    //   }
    // };
    // fetchTeamData();

    // const socketRef = useRef<Socket | null>(null);
    // socketRef.current = io("https://talkspark-dev-api.p-e.kr/socket.io/", {
    //   transports: ["websocket"],
    // });

    console.log(getUserData());
    const user = getUserData();

    //   //이 2가지 과정은 적절하게 위치 옮길 필요 존재.
    //   socketRef.current.emit("joinRoom", { roomId : id, accessToken, isHost });
    //   socketRef.current.on("roomUpdate", (info) => {
    //     //info 객체를 가지고 적절한 동작 수행! (방을 세팅하는)
    //     {
    //       "name": "사람이름",
    //       "isOwner": false // 방장이면 true, 아니면 false
    //       "userId" //아마 이것도 추가로 넘겨준다고 했음
    //     },
    //     ...
    //   });

    //   //그리고 방장 여부는 받아오기
    //   get("/api/rooms/host");

    //   //방 퇴장 시
    //   socketRef.current.emit("leaveRoom", { roomId, accessToken, isHost });
    //   socketRef.current.disconnect();

    //   //(only 방장) 게임 시작 버튼
    // const handleStartGame = (roomId: string) => {
    //   socketRef.current?.emit("startGame", { roomId });
    // };

    // socketRef.current?.on("startGame", () => {
    //   //startGame을 보내고, 그에 대한 응답이 왔을 시 flow로 넘어가는 로직
    //   router.push("/flow/방아이디 어쩌구")
    // });

    //   return () => {
    //     socketRef.current?.disconnect();
    //   };
  }, [id]);

  if (!teamData) {
    return (
      <div>
        <FindRoom findText={"우리 팀 로딩 중이에요!"} />
      </div>
    );
  }

  return (
    <div className="w-[cal(100% + 4rem)] -mx-[2rem] h-[71.2rem] bg-gray-1 px-[2rem]">
      {isLottie ? (
        <Start />
      ) : (
        <div className="flex h-full flex-col justify-between gap-[21.2rem] pb-[6rem] pt-[2.4rem]">
          <div className="flex flex-col gap-[5.2rem]">
            <div className="flex justify-center">
              <div className="flex flex-col">
                <span className="text-center text-body-1-med text-gray-7">
                  난이도{" "}
                  <span className="text-black">{teamData.difficulty}</span>
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
                  <ProfileImage
                    color={participant.color}
                    isHost={participant.isOwner}
                  >
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
      )}
    </div>
  );
};
export default TeamDetail;
