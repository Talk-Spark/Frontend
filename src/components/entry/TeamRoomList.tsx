import { useRouter } from "next/navigation";
import Image from "next/image";
import arrowIcon from "@/public/Image/entry/arrowLeft.svg";

interface GameRoom {
  roomId: number;
  roomName: string;
  hostName: string;
  currentPeople: number;
  maxPeople: number;
}

interface TeamRoomListProps {
  gameRooms: GameRoom[];
}

const TeamRoomList: React.FC<TeamRoomListProps> = ({ gameRooms }) => {
  const router = useRouter();
  const handleTeamClick = (roomId: number) => {
    // roomId을 쿼리로 전달
    router.push(`/team/${encodeURIComponent(roomId)}`);
  };

  return (
    <div className="mb-[1.2rem] mt-[2.4rem] flex flex-col items-center justify-center gap-[1.2rem]">
      {gameRooms.map((gameRoom, index) => (
        <div
          className="flex h-[7.2rem] w-full justify-between gap-[0.4rem] rounded-[1.2rem] border-[0.1rem] border-gray-2 bg-gray-1 py-[1.4rem] pl-[1.6rem] pr-[0.8rem]"
          key={index}
        >
          <div>
            <span className="text-body-2-reg text-gray-9">
              방장 {gameRoom.hostName}
            </span>
            <div className="flex gap-[0.4rem]">
              <span className="text-body-2-bold text-gray-11">
                {gameRoom.roomName}
              </span>
              <span className="text-body-2-med text-gray-7">
                {gameRoom.currentPeople}
              </span>
            </div>
          </div>
          <Image
            src={arrowIcon}
            alt="화살표 이미지"
            className="cursor-pointer"
            onClick={() => handleTeamClick(gameRoom.roomId)}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamRoomList;
