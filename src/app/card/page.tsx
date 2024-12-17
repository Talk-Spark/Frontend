"use client";
import SearchInput from "@/src/components/SearchInput";
import { useState } from "react";
import Image from "next/image";
import Sorting from "@/src/components/Storage/Sorting";
import TeamBox from "@/src/components/Storage/TeamBox";
import Button from "@/src/components/common/Button";

const Card = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [activeView, setActiveView] = useState<"mine" | "others">("others");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {};

  const handleToggle = (view: "mine" | "others") => {
    setActiveView(view);
  };

  return (
    <div className="flex min-h-[81.2rem] flex-col items-center">
      <div className="relative mb-[0.8rem] flex w-full justify-between text-subhead-bold">
        <button
          onClick={() => handleToggle("mine")}
          className={`flex flex-1 justify-center ${
            activeView === "mine" ? "text-black" : "text-gray-5"
          }`}
        >
          내 명함
        </button>
        <button
          onClick={() => handleToggle("others")}
          className={`flex flex-1 justify-center ${
            activeView === "others" ? "text-black" : "text-gray-5"
          }`}
        >
          보관함
        </button>
      </div>
      {/* 하단 강조 바 */}
      <div className="relative mb-[2rem] h-[0.3rem] w-full rounded-[0.4rem] bg-gray-300">
        <div
          className="absolute h-full w-[50%] rounded-[0.4rem] bg-main-pink transition-transform duration-300"
          style={{
            transform:
              activeView === "mine" ? "translateX(0)" : "translateX(100%)",
          }}
        ></div>
      </div>
      <SearchInput
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        placeholderText={"팀명 또는 이름 검색"}
        isQr={false}
        onSearch={handleSearch}
      />
      <div className="mb-[1.2rem] mt-[2.4rem] flex w-full justify-between">
        <div className="flex items-center gap-[0.4rem]">
          <span className="text-body-1-med text-gray-11">보관된 명함</span>
          <span className="text-body-1-bold text-gray-7">10</span>
        </div>
        <Sorting />{" "}
      </div>
      <TeamBox />
      <button className="fixed bottom-[6rem] h-[5.6rem] w-[calc(100%-4rem)] rounded-[1.2rem] bg-gray-11 text-subhead-bold text-white">
        명함 추가하기
      </button>
    </div>
  );
};

export default Card;
