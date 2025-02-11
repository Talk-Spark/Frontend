"use client";

import Button from "@/src/components/common/Button";
import landingImage from "@/public/Image/onBoarding/landingImage.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { instance } from "@/src/apis";

const Page = () => {
  const router = useRouter();
  /* 내 명함 조회하기 API */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/cards");
        const cardRes = response.data.data[0];
        if (cardRes) router.push("/home"); //만약 이미 존재한다면 해당 과정 생략
      } catch (e) {
        //console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="-mx-[2rem] pb-[6rem] pt-[2.4rem] flex w-[100%+4rem] flex-col items-center justify-center gap-[1.3rem] bg-white">
      <div className="flex flex-col items-center gap-[3.2rem] text-center text-black">
        <div className="text-headline-3">
          TalkSpark
          <br />
          서로의 명함을 맞춰보세요!
        </div>
        <Image src={landingImage} width={335} height={335} alt="landingImage" />
        <div className="text-headline-5">
          나를 소개하는 첫 걸음,
          <br />
          지금 나만의 명함을 완성해 보세요!
        </div>
      </div>
      <Button
        variant="pink"
        onClick={() => {
          router.push("/creating-card");
        }}
      >
        내 명함 만들기
      </Button>
    </div>
  );
};

export default Page;
