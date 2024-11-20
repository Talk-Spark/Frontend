"use client";

import Header from "./Header";
import { usePathname } from "next/navigation";
import { HeaderProps } from "./Header";

const headerConfig: Record<string, HeaderProps> = {
  "/": { showButton1: true, title: "hi" },
  "/page1": { showButton1: true, title: "" },
  "/page2": { showButton1: true, title: "TEXT텍스트영역" },
  "/page3": {
    showButton1: true,
    title: "TEXT텍스트영역",
    button2Type: "edit",
    button2Action: () => {
      alert("hi");
    },
  },
  "/page4": {
    showButton1: true,
    title: "TEXT텍스트영역",
    button2Type: "complete",
    button2Action: () => {},
  },
  "/page5": {
    showButton1: false,
    title: "TEXT텍스트영역",
    button2Type: "next",
    button2Action: () => {},
  },
  "/page6": {
    showButton1: true,
    title: "TEXT텍스트영역",
    button2Type: "exit",
    button2Action: () => {},
  },
  "/page7": {
    showButton1: true,
    title: "TEXT텍스트영역",
    button2Type: "settings",
    button2Action: () => {},
  },
};

const HeaderWrapper = () => {
  const pathname = usePathname();

  const getHeaderProps = () => headerConfig[pathname] || null;

  const headerProps = getHeaderProps();

  return headerProps ? <Header {...headerProps} /> : null;
};

export default HeaderWrapper;
