"use client";
import searchIcon from "@/public/entry/search.svg";
import scannerIcon from "@/public/entry/scanner.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchInputProps = {
  setSearchValue: (value: string) => void;
  searchValue: string;
  placeholderText: string;
  isQr: boolean;
  onSearch?: () => void; // 입장하기 시에만 사용
};

const SearchInput = (props: SearchInputProps) => {
  const { setSearchValue, searchValue, placeholderText, isQr, onSearch } =
    props;
  const [value, setValue] = useState("");
  const borderBT = searchValue ? "border-b-black" : "border-b-gray-4 ";
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(value); // 입장하기 변경
      if (onSearch) {
        onSearch();
      }
    }
  };

  const onCamera = () => {
    router.push("/entry/camera");
  };

  return (
    <div
      className={`flex w-full items-center justify-center gap-[0.8rem] border-b-[0.15rem] ${borderBT} px-[1.2rem] py-[1rem]`}
    >
      {!value && <Image src={searchIcon} alt="돋보기 아이콘" />}
      <input
        className="search-reset w-full text-subhead-med placeholder-gray-5 focus:outline-none"
        placeholder={placeholderText}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={value}
        type="search"
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
