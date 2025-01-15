import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

type Direction = "forward" | "backward";

interface RouterWrapperContextType {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  isInitialLoad: boolean;
  setIsInitialLoad: (state: boolean) => void;
  handleNavigation: (url: string, isForward: boolean) => void;
}

export const RouterWrapperContext = createContext<RouterWrapperContextType>({
  direction: "forward",
  setDirection: () => {},
  isInitialLoad: true,
  setIsInitialLoad: () => {},
  handleNavigation: () => {},
});

export const RouterWrapperProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [direction, setDirection] = useState<Direction>("forward");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const handleNavigation = (url: string, isForward: boolean) => {
    setIsInitialLoad(false); // 초기 로드 해제
    setDirection(isForward ? "forward" : "backward");
    router.push(url);
  };

  return (
    <RouterWrapperContext.Provider
      value={{
        direction,
        isInitialLoad,
        setDirection,
        handleNavigation,
        setIsInitialLoad,
      }}
    >
      {children}
    </RouterWrapperContext.Provider>
  );
};
