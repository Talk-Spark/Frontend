"use client";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/public/Image/entry/search.svg";
import scannerIcon from "@/public/Image/entry/scanner.svg";

const SearchInput = ({
  setSearchValue,
  searchValue,
  placeholderText,
  isQr,
  onSearch,
  setIsCamera,
}: {
  setSearchValue: (value: string) => void;
  searchValue: string;
  placeholderText: string;
  isQr: boolean;
  onSearch?: () => void; // 엔터 키 입력 시 호출되는 함수 (최신)
  setIsCamera?: (value: boolean) => void; //(최신)
}) => {
  const [value, setValue] = useState("");
  const borderBT = value ? "border-b-black" : "border-b-gray-4 ";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(value);
      console.log("으하하");
      if (onSearch) {
        onSearch();
      }
    }
  };

  const onCamera = () => {
    if (setIsCamera) setIsCamera(true);
  };
  return (
    <div
      className={`flex w-full items-center justify-center gap-[0.8rem] border-b-[0.15rem] ${borderBT} px-[1.2rem] py-[1rem]`}
    >
      {!value && <Image src={searchIcon} alt="돋보기 아이콘" />}
      <input
        className="search-reset focus:outline-non w-full bg-white text-subhead-med text-black placeholder-gray-5"
        type="search"
        value={value}
        placeholder={placeholderText}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      {isQr && (
        <Image
          src={scannerIcon}
          alt="큐알 스캐너 아이콘"
          className="cursor-pointer"
          onClick={() => onCamera()}
        />
      )}
    </div>
  );
};

export default SearchInput;
