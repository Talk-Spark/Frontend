"use client";
import { useState } from "react";

import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";
import MyCard from "@/src/components/Storage/MyCard";
import { useEdit } from "@/src/context/Context";

const Card = () => {
  const { isEditing } = useEdit();
  const [activeView, setActiveView] = useState<"mine" | "others">("others");

  const handleToggle = (view: "mine" | "others") => {
    setActiveView(view);
  };

  return (
    <div className="-mx-[2rem] flex w-[calc(100%+4rem)] flex-col items-center">
      <div className="flex w-full flex-col">
        <div className="relative mx-[2rem] mb-[0.8rem] flex w-[calc(100%-4rem)] flex-1 justify-between text-subhead-bold">
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
        <div className="w-[calc(100% - 4rem)] relative mx-[2rem] mb-[2rem] h-[0.3rem] rounded-[0.4rem] bg-gray-300">
          <div
            className="absolute h-full w-[50%] rounded-[0.4rem] bg-main-pink transition-transform duration-300"
            style={{
              transform:
                activeView === "mine" ? "translateX(0)" : "translateX(100%)",
            }}
          ></div>
        </div>
      </div>
      {activeView === "others" ? <SearchAndGetCard /> : <MyCard />}
    </div>
  );
};

export default Card;
