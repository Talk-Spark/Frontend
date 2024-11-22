import React, { useState } from "react";
import Button from "../common/Button";
import ProfileImage from "../ProfileImage";

type CharacterColor = "pink" | "yellow" | "green" | "blue";

const Step4 = () => {
  // 선택된 캐릭터(색상) 상태 관리
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");

  const handleSelectCharacter = (color: CharacterColor) => {
    setSelectedCharacter(color);
  };

  // todo: 명함 정보 담아서 서버로 보내기
  const handleNextClick = () => {
    alert("명함 생성 완료!");
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
                  onClick={() => handleSelectCharacter(color)}
                  className="cursor-pointer"
                >
                  <ProfileImage
                    color={color}
                    isSelected={selectedCharacter === color}
                    size={148}
                    backColor={selectedCharacter === color ? "blue" : "gray"}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={handleNextClick}
        variant={selectedCharacter ? "black" : "gray"}
        disabled={!selectedCharacter}
      >
        다음으로
      </Button>
    </div>
  );
};

export default Step4;
