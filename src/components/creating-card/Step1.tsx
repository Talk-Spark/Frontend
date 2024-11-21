import Button from "../common/Button";

export type StepProps = {
  onNext: () => void;
};

const Step1 = ({ onNext }: StepProps) => {
  return (
    <div className="flex flex-col gap-[13.5rem]">
      <div className="flex flex-col gap-[5.2rem]">
        <div>
          <h2 className="relative mb-[0.8rem] text-headline-3 text-black">
            기본 정보를 입력해 주세요
            <span className="absolute top-0 text-body-2-med text-main-pink">
              *
            </span>
          </h2>
          <p className="text-body-2-med text-gray-9">
            TalkSpark에서 나만의 명함을 만들어 보세요!
          </p>
        </div>
        <div className="flex flex-col gap-[3.6rem]">
          <div>이름</div>
          <div>나이</div>
          <div>전공/직무</div>
        </div>
      </div>
      <Button onClick={onNext} variant="gray">
        다음으로
      </Button>
    </div>
  );
};

export default Step1;
