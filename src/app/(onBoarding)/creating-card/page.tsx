"use client";

import Step1 from "@/src/components/creating-card/Step1";
import Step2 from "@/src/components/creating-card/Step2";
import Step3 from "@/src/components/creating-card/Step3";
import Step4 from "@/src/components/creating-card/Step4";
import { useState } from "react";

export type FormData = {
  name: string;
  age: string;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  intro: string;
  tmi: string;
  selectedCharacter: string;
};

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    major: "",
    mbti: "",
    hobby: "",
    lookAlike: "",
    intro: "",
    tmi: "",
    selectedCharacter: "",
  });

  // 사용자 입력 데이터 추가
  const handleChange = (key: keyof FormData, value: string) => {
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

  // const handlePrevStep = () => {
  //   if (currentStep > 1) {
  //     setCurrentStep((prev) => prev - 1);
  //     setProgress((prev) => prev - 25);
  //   }
  // };

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
        return (
          <Step4
            onNext={setFormData}
            formData={formData}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-[6rem] mt-[0.4rem] flex flex-col items-center justify-center">
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
