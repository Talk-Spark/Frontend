"use client";

import loginImage from "@/public/Image/onBoarding/loginImage.svg";
import kakaoImage from "@/public/Image/onBoarding/kakaoImage.svg";
import Image from "next/image";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

const page = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  //console.log(process.env.NEXT_PUBLIC_REST_API_KEY);

  return (
    <div className="mb-[6rem] mt-[2.4rem] flex flex-col items-center justify-center gap-[1.3rem]">
      <div className="flex flex-col items-center gap-[3.2rem] text-center text-black">
        <div className="text-headline-3">
          어색한 첫 만남,
          <br />더 이상 걱정하지 마세요
        </div>
        <Image src={loginImage} width={335} height={335} alt="landingImage" />
        <div className="text-headline-5">
          TalkSpark가
          <br />
          대화의 불꽃을 피워드릴게요!
        </div>
      </div>
      <button
        onClick={handleKakaoLogin}
        className="flex h-[5.6rem] w-[33.5rem] items-center justify-center gap-[1rem] rounded-[1.2rem] bg-sub-yellow-kakao"
      >
        <Image src={kakaoImage} width={20} height={18} alt="kakaoImage" />
        <p className="text-subhead-bold text-gray-11">카카오 로그인</p>
      </button>
    </div>
  );
};

export default page;
