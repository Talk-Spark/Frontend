"use client";
import Header from "./Header";
import { usePathname } from "next/navigation";

const HeaderWrapper = () => {
  const pathname = usePathname();

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
      // } else if (pathname === "/card") {
      //   return {
      //     showButton1: true,
      //     title: "명함 보관함",
      //     button2Type: isEditing ? "complete" : "edit", // 편집 상태에 따라 버튼 타입 변경
      //     button2Action: isEditing ? handleCompleteClick : handleEditClick,
      //   };
      // } else if (pathname.startsWith("/card/camera")) {
      return {
        showButton1: true,
        title: "명함 추가하기",
        button2Action: () => {},
      };
    } else if (pathname.startsWith("/card/detail")) {
      return {
        showButton1: true,
        title: "명함 보관함",
        button2Action: () => {},
      };
    } else if (pathname.startsWith("/card/camera")) {
      return {
        showButton1: true,
        title: "명함 추가하기",
        button2Action: () => {},
      };
    } else if (pathname.startsWith("/team/")) {
      return {
        showButton1: true,
        title: "입장하기",
        button2Action: () => {},
      };
    } else if (pathname === "/creating-room/result") {
      return {
        title: "방 개설하기",
      };
    }

    return null;
  };

  const headerProps = getHeaderProps();

  return headerProps ? <Header {...headerProps} /> : null;
};

export default HeaderWrapper;
