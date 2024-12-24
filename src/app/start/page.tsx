"use client";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import startLottie from "@/public/entry/countdown_white.json";

const Start = () => {
  const router = useRouter();
  // useSearchParams을 통해 roomId 받은 후 방으로 이동하기
  // const searchParams = useSearchParams();
  // const roomId = searchParams.get("roomId");

  // 로띠 애니메이션이 끝난 후 실행되는 함수
  const handleAnimationComplete = () => {
    // 애니메이션이 끝난 후 3초 대기하고 다른 페이지로 이동
    setTimeout(() => {
      router.push("/"); // 추후 방으로 이동 수정 필요
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
