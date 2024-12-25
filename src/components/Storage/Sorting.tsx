import Image from "next/image";
import arrowBt from "@/public/storageNameCard/arrowBt.svg";
import { useState } from "react";

const Sorting = ({
  deleteModal,
  setSortOption,
  isEdit,
}: {
  deleteModal: (type: "selected" | "all") => void;
  setSortOption: (option: string) => void;
  isEdit: "edit" | "complete";
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const options = ["최신순", "가나다순", "즐겨찾기"];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsActive(false);
    setSortOption(option);
  };

  return (
    <div className="relative">
      {isEdit === "complete" ? (
        <div className="flex h-full w-[13rem] items-center justify-between gap-[0.8rem] text-caption-med text-gray-7">
          <button
            onClick={() => deleteModal("all")}
            className="h-[2.5rem] flex-1 rounded-[1.2rem] border-[0.1rem] border-gray-7 px-[0.8rem]"
          >
            전체 선택
          </button>
          <button
            onClick={() => deleteModal("selected")}
            className="h-[2.5rem] flex-1 rounded-[1.2rem] border-[0.1rem] border-gray-7"
          >
            삭제
          </button>
        </div>
      ) : (
        <>
          <div
            onClick={() => setIsActive((prev) => !prev)}
            className="flex h-[3.6rem] w-[10.5rem] cursor-pointer gap-[0.5rem] rounded-[2.4rem] border-[0.1rem] border-gray-5 px-[1.5rem] py-[0.6rem]"
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
                    onClick={() => handleSelect(option)}
                    className={`${selectedOption === option ? "text-gray-12" : "text-gray-5"} :bg-gray-100 cursor-pointer py-[1rem] pl-[1.6rem] text-body-2-med hover:bg-gray-1`}
                  >
                    {option}
                  </li>
                  {index !== options.length - 1 && (
                    <div className="mx-[0.8rem] h-[1px] w-[calc(100%-1.6rem)] bg-gray-200"></div>
                  )}
                </div>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
export default Sorting;
