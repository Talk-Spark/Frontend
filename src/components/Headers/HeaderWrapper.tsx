"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import { usePathname } from "next/navigation";

const HeaderWrapper = () => {
  const router = useRouter();
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
    } else if (pathname === "/page6") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
        button2Type: "exit",
        button2Action: () => {},
      };
    } else if (pathname === "/page7") {
      return {
        showButton1: true,
        title: "TEXT텍스트영역",
        button2Type: "settings",
        button2Action: () => {},
      };
    } else if (pathname === "/flow") {
      return {
        showButton1: false,
        title: "명함 맞추기",
      };
    } else if (pathname === "/game-end") {
      return {
        title: "최종 스코어",
        button2Type: "next",
        button2Action: () => {
          router.push("/all-cards");
        },
      };
    } else if (pathname === "/all-cards") {
      return {
        title: "전체 명함 공개",
        button2Type: "next",
        button2Action: () => {
          /*방명록 페이지로 이동하는 알맞은 로직 필요*/
        },
      };
    }
    return null;
  };

  const headerProps = getHeaderProps();

  return headerProps ? <Header {...headerProps} /> : null;
};

export default HeaderWrapper;
