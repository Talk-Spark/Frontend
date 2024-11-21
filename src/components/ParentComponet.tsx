"use client";
import { useState } from "react";
import NameCard from "./NameCard";

const ParentComponent: React.FC = () => {
  // 부모에서 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 상태 변경 함수
  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  return (
    <div>
      <NameCard
        teamName="Team A"
        name="홍길동"
        age={25}
        major="컴퓨터공학"
        mbti="INTJ"
        hobby="게임"
        lookAlike="송중기"
        selfDescription="열정적인 개발자"
        tmi="한 번에 10시간 이상 앉아 있음"
        selectedCategory={selectedCategory} // 부모에서 관리하는 상태 전달
        onCategorySelect={handleCategorySelect} // 부모에서 상태 변경 함수 전달
      />
    </div>
  );
};

export default ParentComponent;
