import React from "react";
import Button from "../common/Button";
import ProfileImage from "../ProfileImage";
import { FormData } from "@/src/app/(onBoarding)/creating-card/page";
import { useRouter } from "next/navigation";
import { post } from "@/src/apis";

interface CardResponse {
  data: {
    cardId: number;
  };
}

// type cardThema = "PINK" | "YELLOW" | "GREEN" | "BLUE";

type Step4Props = {
  formData: FormData;
  onChange: (key: keyof FormData, value: string) => void;
};

const Step4 = ({ formData, onChange }: Step4Props) => {
  const router = useRouter();

  const handleNextClick = async () => {
    const userObj = localStorage.getItem("user");
    if (!userObj) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    const sparkUserId = JSON.parse(userObj).sparkUserId;

    try {
      const response = await post("/api/cards", {
        ...formData,
        sparkUserId: sparkUserId,
      });
      console.log("response: ", response);
      const data = (response.data as CardResponse).data;
      localStorage.setItem("cardId", String(data.cardId));
      router.push("/creating-card/result");
    } catch (error) {
      console.error("명함을 생성하지 못했습니다: ", error);
    }
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
            {["PINK", "YELLOW", "MINT", "BLUE"].map((color) => (
              <div
                key={color}
                onClick={() => onChange("cardThema", color.toUpperCase())}
                className="cursor-pointer"
              >
                <ProfileImage
                  color={
                    color === "MINT"
                      ? "MINT"
                      : (color as "PINK" | "YELLOW" | "BLUE")
                  }
                  isSelected={formData.cardThema === color.toUpperCase()}
                  size={148}
                  backColor={
                    formData.cardThema === color.toUpperCase() ? "blue" : "gray"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        onClick={handleNextClick}
        variant={formData.cardThema ? "black" : "gray"}
        disabled={!formData.cardThema}
      >
        다음으로
      </Button>
    </div>
  );
};

export default Step4;
