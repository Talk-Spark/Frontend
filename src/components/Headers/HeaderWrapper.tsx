"use client";

import { useState } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";

type HeaderWrapperProps = {
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>; // 상태 업데이트 함수 타입
};

const HeaderWrapper = ({
  setIsEdit,
}: {
  setIsEdit?: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false); // 편집 상태 관리

  const getHeaderProps = () => {
    if (pathname === "/" || pathname === "/page1") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
      };
    } else if (pathname === "/page2") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
      };
    } else if (pathname === "/page3") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
        button2Type: "edit",
        button2Action: () => {},
      };
    } else if (pathname === "/page4") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
        button2Type: "complete",
        button2Action: () => {},
      };
    } else if (pathname === "/page5") {
      return {
        showButton1: false,
        title: "TEXT텍스트영역",
        button2Type: "next",
        button2Action: () => {},
      };
    } else if (pathname === "/page6") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
        button2Type: "exit",
        button2Action: () => {},
      };
    } else if (pathname === "/card") {
      return {
        showButton1: true,
        title: "명함 보관함",
        button2Type: isEditing ? "complete" : "edit",
        button2Action: () => {
          setIsEditing((prev) => !prev); // HeaderWrapper 내부 상태 변경
          if (setIsEdit) {
            setIsEdit((prev) => !prev); // setIsEdit이 전달된 경우에만 실행
          }
        },
      };
    }
    return null;
  };

  const headerProps = getHeaderProps();

  return headerProps ? <Header {...headerProps} /> : null;
};

export default HeaderWrapper;
