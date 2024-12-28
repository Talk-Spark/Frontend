"use client";
import Button from "@/src/components/common/Button";
import kakaoImage from "@/public/Image/onBoarding/kakaoImage.svg";
import Image from "next/image";
import QrCode from "@/src/components/QrCode/QrCode";
import { useRouter, useSearchParams } from "next/navigation";

// todo: 버튼들 기능 구현, QR코드 실제 생성
const Result = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const handleHostStartGame = () => {
    localStorage.setItem("isGameHost", "true");
    router.push(`/team/${roomId}`);
  };
  return (
    <div className="mt-[4rem] flex flex-col items-center justify-center gap-[9.2rem]">
      <div className="flex flex-col items-center justify-center gap-[2rem]">
        <h2 className="text-headline-2 text-gray-11">방 만들기 성공!</h2>
        <div className="h-[33.5rem] w-[33.5rem]">
          <QrCode
            cardId={roomId as string}
            name={roomName as string}
            size={335}
          />
        </div>
        <button className="flex h-[5.6rem] w-[33.5rem] items-center justify-center gap-[1rem] rounded-[1.2rem] border-[1.5px] border-gray-3 bg-white">
          <Image src={kakaoImage} width={20} height={18} alt="kakaoImage" />
          <p className="text-body-1-bold text-gray-9">카카오톡 초대장 보내기</p>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-[1.2rem]">
        <Button variant="pink" onClick={handleHostStartGame}>
          시작하기
        </Button>
        <p
          className="text-body-2-med text-gray-7 underline decoration-solid decoration-1 underline-offset-4"
          onClick={() => {
            const real = confirm(
              "정말 홈으로 가시겠습니까? 게임이 정상적으로 시작되지 않습니다.",
            );
            if (real) router.push("/home");
          }}
        >
          홈으로 가기
        </p>
      </div>
    </div>
  );
};

export default Result;
