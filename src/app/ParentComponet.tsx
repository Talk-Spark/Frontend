"use client"; // 클라이언트 사이드에서 렌더링되어야 함을 명시

import { useState } from "react";
import NameCard from "../components/NameCard"; // 'components' 경로를 프로젝트에 맞게 수정

const ParentComponent = () => {
  // 선택된 카테고리 상태를 관리 (초기값은 null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리 선택 시 호출되는 함수
  const handleCategorySelect = (category: string) => {
    // 선택된 카테고리가 이미 선택되었으면 해제, 아니면 선택
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  // NameCard에 전달할 데이터 (예시)
  const nameCardData = {
    teamName: "팀이름팀이름",
    name: "이름",
    age: "나이",
    major: "전공",
    mbti: "MBTI",
    hobby: "밥먹기",
    lookAlike: "z",
    selfDescription: "나는 이런 사람이야",
    tmi: "TMI 내용",
  };

  return (
    <div className="space-y-4">
      {/* NameCard에 데이터를 props로 전달 */}
      <NameCard
        {...nameCardData}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
    </div>
  );
};

export default ParentComponent;
