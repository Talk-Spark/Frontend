"use client";

import { useState } from "react";
import Header from "@/src/components/Headers/Header";
import Step1 from "@/src/components/creating-room/Step1";
import Step2 from "@/src/components/creating-room/Step2";
import Step3 from "@/src/components/creating-room/Step3";
import Modal from "@/src/components/common/Modal";
import { useRouter } from "next/navigation";

export type RoomDataForm = {
  name: string;
  participants: number;
  difficulty: number;
};

const CreatingRoomPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomData, setRoomData] = useState<RoomDataForm>({
    name: "",
    participants: 2,
    difficulty: 0,
  });

  const handleRouting = (addr: string) => {
    router.push(addr);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (data: Partial<RoomDataForm>) => {
    setRoomData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            onNext={handleNextStep}
            formData={roomData}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <Step2
            onNext={handleNextStep}
            formData={roomData}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <Step3
            onNext={handleNextStep}
            formData={roomData}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="mb-[6rem] flex flex-col items-center justify-center">
      <div className="mb-[3.6rem] w-full">
        <Header
          title="방 개설하기"
          showButton1={currentStep === 1 ? false : true}
          button1Action={handlePrevStep}
          button2Type="exit"
          button2Action={() => {
            setIsModalOpen(true);
          }}
          padding={false}
        />
      </div>
      {renderStep()}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={() => {
          handleRouting("/home");
        }}
        title="방 만들기를 나가시겠어요?"
        description="지금까지 작성한 내용이 저장되지 않아요"
        buttonText="이어서 만들기"
        actionText="나가기"
      />
    </div>
  );
};

export default CreatingRoomPage;
