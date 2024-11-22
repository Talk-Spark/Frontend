import React, { useState } from "react";
import Button from "../common/Button";
import { StepProps } from "./Step1";
import InputField from "./InputField";

const Step3 = ({ onNext }: StepProps) => {
  const [intro, setIntro] = useState("");
  const [tmi, setTmi] = useState("");

  const fields = [
    {
      label: "나는 이런 사람이야",
      id: "intro",
      value: intro,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setIntro(e.target.value),
      placehorder: "ex. 만능 개발자",
      type: "text",
    },
    {
      label: "나의 TMI는?",
      id: "tmi",
      value: tmi,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTmi(e.target.value),
      placehorder: "ex. 흰 머리가 많다",
      type: "text",
    },
  ];

  return (
    <div className="flex flex-col gap-[25rem]">
      <div className="flex flex-col gap-[5.2rem]">
        <div>
          <h2 className="mb-[0.8rem] text-headline-3 text-black">
            선택 정보를 입력해 주세요
          </h2>
          <p className="text-body-2-med text-gray-9">
            문항을 모두 입력하지 않으면 게임 선택에 제한이 있어요!
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
              placeholder={field.placehorder}
              type={field.type}
            />
          ))}
        </div>
      </div>
      <Button onClick={onNext}>다음으로</Button>
    </div>
  );
};

export default Step3;
