"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavigationDirection, useRouterWrapper } from "./RouterWrapperProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { direction } = useRouterWrapper();

  // 캐싱된 이전 페이지를 저장할 상태
  const [prevCache, setPrevCache] = React.useState<React.ReactNode | null>(
    null,
  );

  React.useLayoutEffect(() => {
    // 새 경로로 이동할 때 이전 페이지를 캐싱
    setPrevCache(children);
    window.scrollTo(0, 0); // 애니메이션 시작 전에 스크롤 이동
  }, [pathname]);

  return (
    <div className="relative">
      <motion.div
        key={pathname}
        custom={direction}
        variants={{
          enter: (direction: NavigationDirection) => ({
            x: direction === "forward" ? "100vw" : "-100vw",
          }),
          center: {
            x: 0,
          },
        }}
        initial={"enter"}
        animate={"center"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>

      <motion.div
        key={"prev cache page"}
        custom={direction}
        variants={{
          center: {
            x: 0,
            y: 0,
          },
          exit: (direction: NavigationDirection) => ({
            x: direction === "forward" ? "-100vw" : "100vw",
            y: 0,
          }),
        }}
        initial={"center"}
        animate={"exit"}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute w-[100vw]"
      ></motion.div>
    </div>
  );
}
