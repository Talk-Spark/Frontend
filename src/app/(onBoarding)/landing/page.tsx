import Button from "@/src/components/common/Button";
import landingImage from "@/public/Image/onBoarding/landingImage.svg";
import Image from "next/image";

const page = () => {
  return (
    <div className="mb-[6rem] mt-[2.4rem] flex flex-col items-center justify-center gap-[4.5rem]">
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
      <Button>내 명함 만들기</Button>
    </div>
  );
};

export default page;
