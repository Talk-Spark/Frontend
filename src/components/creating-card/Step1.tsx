import { useEffect, useState } from "react";
import Button from "../common/Button";
import InputField from "./InputField";
import { FormData } from "@/src/app/(onBoarding)/creating-card/page";

export type StepProps = {
  onNext: () => void;
  formData: FormData;
  onChange: (key: keyof FormData, value: string) => void;
};

const Step1 = ({ onNext, formData, onChange }: StepProps) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const fields = [
    {
      label: "이름",
      id: "name",
      value: formData.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange("name", e.target.value),
      placeholder: "이름을 입력해 주세요",
      type: "text",
    },
    {
      label: "나이",
      id: "age",
      value: formData.age,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange("age", e.target.value),
      placeholder: "숫자만 입력해 주세요",
      type: "number",
    },
    {
      label: "전공/직무",
      id: "major",
      value: formData.major,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange("major", e.target.value),
      placeholder: "ex. 경영학 전공, IT 서비스 기획 직무",
      type: "text",
    },
  ];

  useEffect(() => {
    setIsFormValid(!!formData.name && !!formData && !!formData.major);
  }, [formData]);

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    }
  };

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
          {fields.map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              id={field.id}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
        </div>
      </div>
      <Button
        onClick={handleNext}
        variant={isFormValid ? "black" : "gray"}
        disabled={!isFormValid}
      >
        다음으로
      </Button>
    </div>
  );
};

export default Step1;
