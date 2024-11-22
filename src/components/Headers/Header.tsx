import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import icon from "@/src/components/Headers/icon.svg";

type HeaderProps = {
  showButton1?: boolean; // 버튼1 표시 여부
  button1Action?: () => void;
  title: string; // 헤더 텍스트
  button2Type?: "edit" | "complete" | "next" | "exit" | "settings" | string; // 버튼2 종류
  button2Action?: () => void; // 버튼2 클릭 동작
};

const Header = ({
  showButton1 = false,
  button1Action = () => window.history.back(),
  title,
  button2Type,
  button2Action,
}: HeaderProps) => {
  // 버튼2 텍스트 및 스타일 매핑
  const button2Config: Record<
    string,
    { text?: string; style?: string; icon?: React.ReactNode }
  > = {
    edit: { text: "편집", style: "text-main-pink" },
    complete: { text: "완료", style: "text-main-pink" },
    next: { text: "다음", style: "text-main-pink" },
    exit: { text: "나가기", style: "text-gray-7" },
    settings: {
      icon: (
        <Image
          src={icon}
          alt="설정"
          layout="intrinsic"
          className="h-[2.4rem] w-[2.4rem]"
        />
      ),
    },
  };

  const button2 = button2Type ? button2Config[button2Type] : null;

  return (
    <header className="relative flex h-[5.2rem] items-center justify-between bg-white px-[2rem]">
      {/* 버튼1: 뒤로 가기 버튼 */}
      {showButton1 ? (
        <button
          onClick={button1Action} // 기본: 페이지 뒤로가기
          className="flex w-[2.4rem] items-center justify-center text-[2.4rem] text-gray-7"
          aria-label="Back"
        >
          <ArrowBackIosNewIcon
            style={{ fontSize: "2.2rem" }}
            className="text-gray-7"
          />
        </button>
      ) : (
        <div className="w-[2.4rem]" /> // 버튼1이 없을 때 공간 유지
      )}

      {/* 헤더 제목 */}
      <h1 className="absolute left-1/2 -translate-x-1/2 transform text-body-1-med text-gray-10">
        {title}
      </h1>

      {/* 버튼2: button2Action 동작 */}
      {button2 ? (
        <button
          onClick={button2Action} // 커스텀 함수
          className={`text-body-1-med ${button2.style}`}
        >
          {button2.icon || button2.text}
        </button>
      ) : (
        <div className="w-[2.4rem]" /> // 버튼2가 없을 때 공간 유지
      )}
    </header>
  );
};

export default Header;
