"use client";

import Step1 from "@/src/components/creating-card/Step1";
import Step2 from "@/src/components/creating-card/Step2";
import Step3 from "@/src/components/creating-card/Step3";
import Step4 from "@/src/components/creating-card/Step4";
import Header from "@/src/components/Headers/Header";
import { useState } from "react";

// 명함에 담을 데이터 타입
export type FormData = {
  name: string; // 이름(string)
  age: number; // 나이(number)
  major: string; // 전공(string)
  mbti: string; // mbti(string)
  hobby: string; // 취미(string)
  lookAlike: string; // 외모(string)
  slogan: string; // 자기소개(string)
  tmi: string; // 명함 소개(string)
  cardThema: string; // 선택한 캐릭터(string)
  sparkUserId: number; // 스파크 유저 아이디(number)
};

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: 0,
    major: "",
    mbti: "",
    hobby: "",
    lookAlike: "",
    slogan: "",
    tmi: "",
    cardThema: "",
    sparkUserId: 0,
  });

  // 사용자 입력 데이터 추가
  const handleChange = (key: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      setProgress((prev) => prev + 25);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setProgress((prev) => prev - 25);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            onNext={handleNextStep}
            formData={formData}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <Step2
            onNext={handleNextStep}
            formData={formData}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <Step3
            onNext={handleNextStep}
            formData={formData}
            onChange={handleChange}
          />
        );
      case 4:
        return <Step4 formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-[6rem] flex flex-col items-center justify-center">
      <div className="w-full">
        <Header
          title="TalkSpark"
          showButton1={true}
          button1Action={
            currentStep == 1 ? () => window.history.back() : handlePrevStep
          }
          padding={false}
        />
      </div>
      <div className="mb-[0.4rem] w-full">
        <div className="relative mb-[0.8rem] h-[0.4rem] rounded-[0.4rem] bg-gray-3">
          <div
            className="absolute left-0 top-0 h-full rounded-[0.4rem] bg-main-pink transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-caption-med text-gray-5">
          {currentStep}/4
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default Page;
