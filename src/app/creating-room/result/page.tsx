"use client";
import Button from "@/src/components/common/Button";
import kakaoImage from "@/public/Image/onBoarding/kakaoImage.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QrCode from "@/src/components/QrCode/QrCode";

// todo: 버튼들 기능 구현, QR코드 실제 생성
const Result = () => {
  const router = useRouter();
  const roomId = localStorage.getItem("roomId");
  const roomName = localStorage.getItem("roomName");

  return (
    <div className="mt-[4rem] flex h-[58.4rem] flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center gap-[3.6rem]">
        <h2 className="text-headline-2 text-gray-11">방 만들기 성공!</h2>
        <div className="h-[30.3rem] w-[30.3rem]">
          <QrCode
            cardId={Number(roomId)}
            name={roomName as string}
            size={303}
          />
        </div>
        <button className="flex h-[5.6rem] w-[33.5rem] items-center justify-center gap-[1rem] rounded-[1.2rem] border-[1.5px] border-gray-3 bg-white">
          <Image src={kakaoImage} width={20} height={18} alt="kakaoImage" />
          <p className="text-body-1-bold text-gray-9">카카오톡 초대장 보내기</p>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-[1.2rem]">
        {/* todo: 입장하기 1_방장으로 이동 */}
        <Button variant="pink">시작하기</Button>
        <p
          className="text-body-2-med text-gray-7 underline decoration-solid decoration-1 underline-offset-4"
          onClick={() => router.push("/home")}
        >
          홈으로 가기
        </p>
      </div>
    </div>
  );
};

export default Result;
