import Button from "@/src/components/common/Button";

const Page = () => {
  return (
    <div className="mb-[6rem] mt-[2.4rem] flex flex-col items-center justify-center">
      <div className="mb-[3.2rem] text-center text-headline-3 text-black">
        환영해요
        <br />
        명함이 완성되었어요!
      </div>
      <div className="h-[33.5rem] w-full">로티</div>
      <div className="flex justify-between">
        <Button>홈으로</Button>
        <Button>명함 보관함</Button>
      </div>
    </div>
  );
};

export default Page;
