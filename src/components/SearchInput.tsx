"use client";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/public/Image/entry/search.svg";
import scannerIcon from "@/public/Image/entry/scanner.svg";

const SearchInput = ({
  setSearchValue,
  placeholderText,
  isQr,
  onSearch,
  setIsCamera,
  setIsFirst,
}: {
  setSearchValue: (value: string) => void;
  placeholderText: string;
  isQr: boolean;
  onSearch?: () => void; // 엔터 키 입력 시 호출되는 함수
  setIsCamera?: (value: boolean) => void; 
  setIsFirst?: (value: boolean) => void; // entry 첫 렌더링인지 확인
}) => {
  const [value, setValue] = useState("");
  const borderBT = value ? "border-b-black" : "border-b-gray-4 ";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(value);
      if (setIsFirst) {
        setIsFirst(true);
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
        className="search-reset w-full bg-white text-subhead-med text-black placeholder-gray-5 focus:outline-none"
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
