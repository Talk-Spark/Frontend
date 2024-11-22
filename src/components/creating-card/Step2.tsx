import React, { useState } from "react";
import Button from "../common/Button";
import { StepProps } from "./Step1";
import InputField from "./InputField";

const Step2 = ({ onNext }: StepProps) => {
  const [mbti, setMbti] = useState("");
  const [hobby, setHobby] = useState("");
  const [lookAlike, setLookAlike] = useState("");

  const fields = [
    {
      label: "나의 MBTI 유형은?",
      id: "mbti",
      value: mbti,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setMbti(e.target.value),
      placehorder: "ex. ESTJ",
      type: "text",
    },
    {
      label: "나의 취미는??",
      id: "hobby",
      value: hobby,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setHobby(e.target.value),
      placehorder: "ex. 영화 보기",
      type: "text",
    },
    {
      label: "나의 닮은꼴은?",
      id: "lookAlike",
      value: lookAlike,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setLookAlike(e.target.value),
      placehorder: "ex. 토끼",
      type: "text",
    },
  ];

  return (
    <div className="flex flex-col gap-[13.5rem]">
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

export default Step2;
