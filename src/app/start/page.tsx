"use client";
import { useRouter } from "next/navigation"; // 'next/navigation'에서 useRouter import
import startLottie from "@/public/entry/countdown_white.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const Start = () => {
  const router = useRouter();
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
