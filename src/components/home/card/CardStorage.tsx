// 명함 저장소
import NameCardComponent from "./NameCardComponent";

export interface Member {
  id: number;
  name: string;
  color: string;
}

interface Team {
  teamName: string;
  members: Member[];
}

const CardStorage = () => {
  // 더미 데이터
  const teams: Team[] = [
    {
      teamName: "1팀",
      members: [
        { id: 1, name: "김개발", color: "pink" },
        { id: 2, name: "이코딩", color: "green" },
        { id: 9, name: "정기획", color: "yellow" },
      ],
    },
    {
      teamName: "2팀",
      members: [
        { id: 3, name: "이름이", color: "green" },
        { id: 4, name: "이름이", color: "blue" },
        { id: 10, name: "이름이", color: "yellow" },
      ],
    },
    {
      teamName: "3팀",
      members: [
        { id: 5, name: "이름이", color: "blue" },
        { id: 6, name: "이름이", color: "blue" },
        { id: 11, name: "송기획", color: "yellow" },
      ],
    },
    {
      teamName: "4팀",
      members: [
        { id: 7, name: "이름이", color: "pink" },
        { id: 8, name: "이름이", color: "blue" },
        { id: 12, name: "임기획", color: "yellow" },
      ],
    },
  ];

  return (
    <div className="flex gap-[1.6rem] overflow-x-auto">
      {/* 최대 5개 렌더링 */}
      {teams.slice(0, 5).map((team) => (
        <div key={team.teamName}>
          <NameCardComponent name={team.teamName} members={team.members} />
        </div>
      ))}
    </div>
  );
};

export default CardStorage;
