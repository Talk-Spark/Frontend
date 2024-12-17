import Image from "next/image";
import arrowBt from "@/public/storageNameCard/arrowBt.svg";
import { useState } from "react";

const Sorting = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순"); // 선택된 옵션

  const options = ["최신순", "가나다순", "즐겨찾기"]; // 옵션 목록

  const handleSelect = (option: string) => {
    setSelectedOption(option); // 선택한 옵션 업데이트
    setIsActive(false); // 드롭다운 닫기
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsActive((prev) => !prev)} // 토글
        className="border-1 box-border flex h-[3.6rem] w-[10.5rem] cursor-pointer gap-[0.5rem] rounded-[2.4rem] border-gray-5 px-[1.5rem] py-[0.6rem]"
      >
        <span className="flex w-[3.7rem] flex-1 items-center justify-center text-body-2-med text-gray-7">
          {selectedOption}
        </span>
        <Image
          src={arrowBt}
          alt="클릭 화살표"
          className="flex w-[1.7rem] items-center"
        />
      </div>
      {isActive && (
        <ul className="border absolute right-0 z-10 mt-2 w-[14.2rem] rounded-[1.2rem] bg-white shadow">
          {options.map((option, index) => (
            <div key={index}>
              <li
                onClick={() => handleSelect(option)} // 옵션 클릭 시 실행
                className={`${selectedOption === option ? "text-gray-12" : "text-gray-5"} cursor-pointer py-[1rem] pl-[1.6rem] text-body-2-med hover:bg-gray-100`}
              >
                {option}
              </li>
              {/* 마지막 옵션을 제외하고 구분선을 추가 */}
              {index !== options.length - 1 && (
                <div className="mx-[0.8rem] h-[1px] w-[calc(100%-1.6rem)] bg-gray-200"></div> // 구분선
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Sorting;
