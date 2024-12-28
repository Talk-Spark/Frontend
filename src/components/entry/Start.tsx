"use client";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import startLottie from "@/public/countdown_white.json";

const Start = () => {
  const router = useRouter();

  // 로띠 애니메이션이 끝난 후 실행되는 함수
  const handleAnimationComplete = () => {
    // 애니메이션이 끝난 후 3초 대기하고 다른 페이지로 이동

    setTimeout(() => {
      /* 추후 게임 방으로 이동 필요 (웹소켓) */
      router.push("/");
    }, 3000);
  };

  return (
    <div className="w-[cal(100% + 2rem)] -mx-[2rem] h-full">
      <Lottie
        animationData={startLottie}
        loop={false}
        autoplay={true}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
};

export default Start;
