import React from "react";
import Button from "../common/Button";
import ProfileImage from "../ProfileImage";
import { FormData } from "@/src/app/(onBoarding)/creating-card/page";

type CharacterColor = "pink" | "yellow" | "green" | "blue";

type Step4Props = {
  onNext: (formData: FormData) => void;
  formData: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}

const Step4 = ({onNext, formData, onChange}: Step4Props) => {
  // todo: 명함 정보 담아서 서버로 보내기
  const handleNextClick = () => {
    onNext(formData);
    alert("명함 생성 완료!");
    console.log(formData);
  };

  return (
    <div className="flex flex-col gap-[6.1rem]">
      <div className="flex flex-col gap-[5.2rem]">
        <div>
          <h2 className="relative mb-[0.8rem] text-headline-3 text-black">
            내 명함을 선택해 주세요
            <span className="absolute top-0 text-body-2-med text-main-pink">
              *
            </span>
          </h2>
          <p className="text-body-2-med text-gray-9">
            나중에 명함 보관함에서 확인하실 수 있어요!
          </p>
        </div>
        <div>
          <h2 className="mb-[2rem] text-headline-5 text-black">명함 설정</h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-[1.2rem]">
            {(["pink", "yellow", "green", "blue"] as CharacterColor[]).map(
              (color) => (
                <div
                  key={color}
                  onClick={() => onChange("selectedCharacter", color)}
                  className="cursor-pointer"
                >
                  <ProfileImage
                    color={color}
                    isSelected={formData.selectedCharacter === color}
                    size={148}
                    backColor={formData.selectedCharacter === color ? "blue" : "gray"}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={handleNextClick}
        variant={formData.selectedCharacter ? "black" : "gray"}
        disabled={!formData.selectedCharacter}
      >
        다음으로
      </Button>
    </div>
  );
};

export default Step4;
