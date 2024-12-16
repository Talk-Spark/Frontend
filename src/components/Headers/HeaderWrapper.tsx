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
    } else if (pathname === "/login" || pathname === "/landing") {
      return {
        title: "",
      };
    } else if (pathname === "/creating-card/result") {
      return {
        title: "TalkSpark",
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
