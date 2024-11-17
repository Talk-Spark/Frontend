"use client"; // 클라이언트 사이드에서 렌더링되어야 함을 명시

import majorIcon from "@/public/nameCard/major.svg"; // 프로젝트 경로에 맞춰 수정
import Image from "next/image";
import { useState } from "react";

// NameCard에 전달할 데이터 (예시)
// const nameCardData = {
//   teamName: "팀이름팀이름",
//   name: "홍길동",
//   age: "1298세",
//   major: "전공",
//   mbti: "ENTP",
//   hobby: "밥먹기",
//   lookAlike: "돼지",
//   selfDescription: "먹고자고먹고자고하는사람이야",
//   tmi: "오늘 저녁은 족발",
// };

type NameCardProps = {
  teamName: string;
  name: string;
  age: string;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  selfDescription: string;
  tmi: string;
};

const NameCard: React.FC<NameCardProps> = ({
  teamName,
  name,
  age,
  major,
  mbti,
  hobby,
  lookAlike,
  selfDescription,
  tmi,
}) => {
  // 컴포넌트 내부에서 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리 클릭 시 선택 상태 변경
  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  return (
    <div className="rounded-xl bg-white px-[1.2rem] py-[1.6rem] shadow">
      <div className="mx-[0.8rem] my-[0.4rem]">
        <div className="mb-[0.8rem] text-caption-bold text-main-pink">
          {teamName}
        </div>
        <div className="flex items-center gap-[1.2rem]">
          <div className="text-headline-2">{name}</div>
          <div className="text-subhead-med">{age}</div>
        </div>
        <div className="flex items-center justify-between gap-[2.4rem]">
          {/* 전공 항목 */}
          <div
            className={`flex w-auto flex-1 items-center gap-[0.4rem] rounded-[0.4rem] py-[0.4rem] ${
              selectedCategory === "전공" ? "bg-sub-palePink" : ""
            }`}
            onClick={() => handleCategorySelect("전공")} // 전공 선택
          >
            <Image src={majorIcon} alt="전공 아이콘" width={24} height={24} />
            <div className="flex-1 gap-[0.4rem] px-[0.5rem] text-right text-body-2-med text-black">
              {major}
            </div>
          </div>

          {/* MBTI 항목 */}
          <div
            className={`flex flex-1 items-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
              selectedCategory === "엠비티아이" ? "bg-sub-palePink" : ""
            }`}
            onClick={() => handleCategorySelect("엠비티아이")} // MBTI 선택
          >
            <div
              className={`text-body-1-bold ${
                selectedCategory === "엠비티아이"
                  ? "text-main-pink"
                  : "text-gray-12"
              }`}
            >
              MBTI
            </div>
            <div className="text-body-1-med text-gray-10">{mbti}</div>
          </div>
        </div>
      </div>

      <div className="my-1 h-[0.1rem] w-full bg-gray-4"></div>

      <div className="mx-[0.4rem] flex flex-col gap-[0.4rem]">
        {/* 취미 항목 */}
        <div
          className={`flex items-center justify-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
            selectedCategory === "취미" ? "bg-sub-palePink" : ""
          }`}
          onClick={() => handleCategorySelect("취미")} // 취미 선택
        >
          <div
            className={`text-body-1-bold ${
              selectedCategory === "취미" ? "text-main-pink" : "text-gray-12"
            }`}
          >
            취미
          </div>
          <div className="flex-1 text-right text-body-1-med">{hobby}</div>
        </div>

        {/* 닮은꼴 항목 */}
        <div
          className={`flex items-center justify-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
            selectedCategory === "닮은꼴" ? "bg-sub-palePink" : ""
          }`}
          onClick={() => handleCategorySelect("닮은꼴")} // 닮은꼴 선택
        >
          <div
            className={`text-body-1-bold ${
              selectedCategory === "닮은꼴" ? "text-main-pink" : "text-gray-12"
            }`}
          >
            닮은꼴
          </div>
          <div className="flex-1 text-right text-body-1-med">{lookAlike}</div>
        </div>

        <div>
          <div className="flex justify-between gap-[0.8rem]">
            {/* 나는 이런 사람이야 항목 */}
            <div
              className={`flex max-w-[14rem] flex-1 flex-col gap-[0.8rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
                selectedCategory === "나는 이런 사람이야"
                  ? "bg-sub-palePink"
                  : ""
              }`}
              onClick={() => handleCategorySelect("나는 이런 사람이야")} // 나는 이런 사람이야 선택
            >
              <div
                className={`flex-1 text-body-1-bold ${
                  selectedCategory === "나는 이런 사람이야"
                    ? "text-main-pink"
                    : "text-gray-12"
                }`}
              >
                나는 이런 사람이야
              </div>
              <div className="flex-1 text-body-1-med tracking-tight">
                {selfDescription}
              </div>
            </div>

            {/* TMI 항목 */}
            <div
              className={`flex max-w-[14rem] flex-1 flex-col gap-[0.8rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
                selectedCategory === "TMI" ? "bg-sub-palePink" : ""
              }`}
              onClick={() => handleCategorySelect("TMI")} // TMI 선택
            >
              <div
                className={`text-body-1-bold ${
                  selectedCategory === "TMI" ? "text-main-pink" : "text-gray-12"
                }`}
              >
                TMI
              </div>
              <div className="flex-1 text-body-1-med">{tmi}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
