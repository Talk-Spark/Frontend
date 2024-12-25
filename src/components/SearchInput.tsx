"use client";
import searchIcon from "@/public/entry/search.svg";
import scannerIcon from "@/public/entry/scanner.svg";
import Image from "next/image";

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
  onSearch: () => void; // 엔터 키 입력 시 호출되는 함수
  setIsCamera: (value: boolean) => void;
}) => {
  const borderBT = searchValue ? "border-b-black" : "border-b-gray-4 ";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(); // 검색 함수 호출
    }
  };

  const onCamera = () => {
    setIsCamera(true);
  };
  return (
    <div
      className={`flex items-center justify-center gap-[0.8rem] border-b-[0.15rem] ${borderBT} px-[1.2rem] py-[1rem]`}
    >
      {!searchValue && <Image src={searchIcon} alt="돋보기 아이콘" />}
      <input
        className="search-reset w-full text-subhead-med placeholder-gray-5 focus:outline-none"
        placeholder={placeholderText}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // 키 입력 이벤트 핸들러 추가
        value={searchValue}
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
