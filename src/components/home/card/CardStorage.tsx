// 명함 저장소
import { useEffect, useState } from "react";
import NameCardComponent from "./NameCardComponent";
import { instance } from "@/src/apis";

// 팀 내 명함 정보
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

interface TeamResponse {
  teamName: string;
  cards: {
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
  }[];
}

const CardStorage = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStoredCards = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/api/storedCards/main");
      console.log("response: ", response);

      const data = response.data;
      console.log("data: ", data);
      // 팀 별로 맵핑
      const formattedTeams = data.map((team: TeamResponse) => ({
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
          cardThema: card.cardThema,
          bookMark: card.bookMark,
          cardHolderName: card.cardHolderName,
        })),
      }));
      setTeams(formattedTeams);
      setError(null);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError("명함 데이터가 없습니다.");
      } else {
        setError("명함 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoredCards();
  }, []);

  if (loading) {
    return <div className="text-body-1-med text-gray-7">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-body-1-med text-gray-7">{error}</div>;
  }

  return (
    <div className="flex gap-[1.6rem] overflow-x-auto">
      {/* 최대 5개 렌더링 */}
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
