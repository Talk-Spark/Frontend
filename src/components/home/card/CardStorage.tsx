// 명함 저장소
import { useEffect, useState } from "react";
import NameCardComponent from "./NameCardComponent";
import { instance } from "@/src/apis";

export interface Member {
  id: number;
  name: string;
  color: string;
}

export interface StoredCard {
  storedCardId: number;
  name: string;
  age: number;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  slogan: string;
  tmi: string;
  cardThema: string;
  bookMark: boolean;
  cardHolderName: string;
}

interface Team {
  teamName: string;
  storedCards: StoredCard[];
}

const CardStorage = () => {
  // 더미 데이터
  // const teams: Team[] = [
  //   {
  //     teamName: "1팀",
  //     members: [
  //       { id: 1, name: "김개발", color: "pink" },
  //       { id: 2, name: "이코딩", color: "green" },
  //       { id: 9, name: "정기획", color: "yellow" },
  //     ],
  //   },
  //   {
  //     teamName: "2팀",
  //     members: [
  //       { id: 3, name: "이름이", color: "green" },
  //       { id: 4, name: "이름이", color: "blue" },
  //       { id: 10, name: "이름이", color: "yellow" },
  //     ],
  //   },
  //   {
  //     teamName: "3팀",
  //     members: [
  //       { id: 5, name: "이름이", color: "blue" },
  //       { id: 6, name: "이름이", color: "blue" },
  //       { id: 11, name: "송기획", color: "yellow" },
  //     ],
  //   },
  //   {
  //     teamName: "4팀",
  //     members: [
  //       { id: 7, name: "이름이", color: "pink" },
  //       { id: 8, name: "이름이", color: "blue" },
  //       { id: 12, name: "임기획", color: "yellow" },
  //     ],
  //   },
  // ];

  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStoredCards = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/api/storedCards/main");

      if (response.status === 200) {
        const data = response.data;
        console.log("data: ", data);
        // 팀 별로 맵핑
        const formattedTeams = data.map((team) => ({
          teamName: team.teamName,
          // 팀 내 명함 맵핑
          storageCard: team.cards.map((card) => ({
            storedCardId: card.storedCardId,
            name: card.name,
            age: card.age,
            major: card.major,
            mbti: card.mbti,
            hobby: card.hobby,
            lookAlike: card.lookAlike,
            slogan: card.slogan,
            tmi: card.tmi,
            cardThema: card.cardThema.toLowerCase(), // 색상 소문자로 변환
            bookMark: card.bookMark,
            cardHolderName: card.cardHolderName,
          })),
        }));
        setTeams(formattedTeams);
        setError(null);
      } else {
        setError("명함 데이터를 가져오지 못했습니다.");
      }
    } catch (error) {
      setError("명함 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoredCards();
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
          <NameCardComponent name={team.teamName} members={team.members} />
        </div>
      ))} */}
      {teams.slice(0, 5).map((team) => (
        <div key={team.teamName}>
          <NameCardComponent
            name={team.teamName}
            storedCards={team.storedCards}
          />
        </div>
      ))}
    </div>
  );
};

export default CardStorage;
