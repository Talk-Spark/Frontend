import { RoomDataForm } from "@/src/app/creating-room/page";
import easy from "@/public/Image/creating-room/easy_default.svg";
import normal from "@/public/Image/creating-room/normal_default.svg";
import difficult from "@/public/Image/creating-room/difficult_default.svg";
import random from "@/public/Image/creating-room/random_default.svg";
import easy_pressed from "@/public/Image/creating-room/easy_pressed.svg";
import normal_pressed from "@/public/Image/creating-room/normal_pressed.svg";
import difficult_pressed from "@/public/Image/creating-room/difficult_pressed.svg";
import random_pressed from "@/public/Image/creating-room/random_pressed.svg";
import Image from "next/image";
import { useState } from "react";
import Button from "../common/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter } from "next/navigation";

interface Step3Props {
  formData: RoomDataForm;
  onChange: (data: Partial<RoomDataForm>) => void;
}

const Step3 = ({ formData, onChange }: Step3Props) => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const levels = [
    {
      id: 1,
      name: "하",
      defaultImage: easy,
      pressedImage: easy_pressed,
    },
    {
      id: 2,
      name: "중",
      defaultImage: normal,
      pressedImage: normal_pressed,
    },
    {
      id: 3,
      name: "상",
      defaultImage: difficult,
      pressedImage: difficult_pressed,
    },
    {
      id: 4,
      name: "랜덤",
      defaultImage: random,
      pressedImage: random_pressed,
    },
  ];

  const handleLevelClick = (levelId: number) => {
    setIsFormValid(true);
    setSelectedLevel(levelId);
    onChange({ difficulty: levelId });
  };

  const handleNextClick = () => {
    // todo: 데이터 전송
    router.push("/creating-room/result");
    console.log(formData);
  };

  return (
    <div className="flex h-[61.6rem] flex-col justify-between">
      <div>
        <h2 className="relative mb-[0.8rem] text-headline-3 text-black">
          난이도를 선택해 주세요
          <span className="absolute top-0 text-body-2-med text-main-pink">
            *
          </span>
        </h2>
        <p className="mb-[5.2rem] text-body-2-med text-gray-9">
          4인 기준 예상 소요 시간이에요
        </p>
        <div className="grid grid-cols-2 gap-[1.2rem]">
          {levels.map((level) => (
            <div
              key={level.id}
              className="flex flex-col items-center gap-[1.2rem]"
              onClick={() => handleLevelClick(level.id)}
            >
              <Image
                src={
                  selectedLevel === level.id
                    ? level.pressedImage
                    : level.defaultImage
                }
                alt={level.name}
                width={162}
                height={161}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-[1.6rem]">
        <div className="flex items-center gap-[0.4rem] text-caption-med text-gray-7">
          <InfoOutlinedIcon sx={{ fontSize: "2rem" }} />
          난이도 상과 랜덤은 팀 전체가 선택 문항을 모두 작성해야 해요!
        </div>
        <Button
          onClick={handleNextClick}
          variant={isFormValid ? "black" : "gray"}
          disabled={!isFormValid}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};

export default Step3;
