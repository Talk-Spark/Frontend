import Image, { StaticImageData } from "next/image";
import pinkGraphic from "@/public/storageNameCard/pinkGraphics.svg";
import greenGraphic from "@/public/storageNameCard/greenGraphics.svg";
import blueGraphic from "@/public/storageNameCard/blueGraphics.svg";
import yellowGraphic from "@/public/storageNameCard/yellowGraphics.svg";
import whiteMajorIcon from "@/public/storageNameCard/blueMajorIcon.svg";
import pinkMajorIcon from "@/public/storageNameCard/pinkMajorIcon.svg";
import blackMajorIcon from "@/public/storageNameCard/blackMajorIcon.svg";
import whitePencil from "@/public/storageNameCard/pencil.svg";
import blackPencil from "@/public/storageNameCard/blackPencil.svg";
import blackDown from "@/public/storageNameCard/blackDown.svg";
import whiteDown from "@/public/storageNameCard/down.svg";
import { instance } from "@/src/apis";
import { useEffect, useRef, useState } from "react";

const graphicColor: Record<string, StaticImageData> = {
  PINK: pinkGraphic,
  MINT: greenGraphic,
  YELLOW: yellowGraphic,
  BLUE: blueGraphic,
};

type CardDataProps = {
  // 기본 정보
  name: string;
  age: number;
  major: string;
  mbti?: string;
  hobby?: string;
  lookAlike?: string;
  slogan?: string;
  tmi?: string;
  cardThema: "PINK" | "MINT" | "YELLOW" | "BLUE";
};

type MyNameCardProps = CardDataProps & {
  // 내 명함 response 바디
  // response body
  id?: number;
  kakaoId?: string;
  ownerId?: number;
};

type PutCardProps = CardDataProps & {
  // 내 명함 req putData
  sparkUserId?: number;
};

type CardDetailDataProps = {
  oneCard: MyNameCardProps;
  putData?: PutCardProps;
  contentTextColor?: string;
  setPutData?: React.Dispatch<React.SetStateAction<PutCardProps>>;
  isEditing?: boolean;
  isStorage?: boolean;
  isFull?: boolean;
  setIsEditing?: (value: boolean) => void;
  handleDownload?: () => void;
};

const defaultCard: MyNameCardProps = {
  // 기본값
  id: 0,
  kakaoId: "",
  ownerId: 0,
  name: "이름",
  age: 0,
  major: "",
  cardThema: "PINK",
};

const CardTop = ({
  oneCard = defaultCard,
  putData,
  contentTextColor = "",
  setPutData,
  isEditing = false,
  isStorage = false,
  isFull = false,
  setIsEditing,
  handleDownload,
}: CardDetailDataProps) => {
  const selectedColor = putData?.cardThema
    ? putData.cardThema
    : oneCard?.cardThema;
  const graphicImageUrl = graphicColor[selectedColor] || graphicColor.PINK;
  const pencilImageUrl = selectedColor === "BLUE" ? whitePencil : blackPencil;
  const majorImageUrl =
    selectedColor === "BLUE"
      ? whiteMajorIcon
      : selectedColor === "PINK"
        ? pinkMajorIcon
        : blackMajorIcon;
  const mbtiColor =
    selectedColor === "BLUE"
      ? "text-sub-blue"
      : selectedColor === "PINK"
        ? "text-main-pink"
        : "text-gray-12";
  const downImageUrl = selectedColor === "BLUE" ? whiteDown : blackDown;
  const IsBtn = isEditing;
  const completeBtn =
    selectedColor === "BLUE"
      ? "text-body-1-bold text-gray-1"
      : "text-body-1-bold text-gray-11";

  const btnColor = {
    PINK: "bg-sub-pink",
    YELLOW: "bg-sub-yellow",
    MINT: "bg-sub-mint",
    BLUE: "bg-sub-blue",
  };

  const backColorTop: Record<string, string> = {
    PINK: "bg-gradient-to-b from-[#FFCCE1] to-[#FFA6CA]",
    MINT: "bg-gradient-to-b from-[#BBFFF3] to-[#66F5DC]",
    YELLOW: "bg-gradient-to-b from-[#FFEFB7] to-[#FEE485]",
    BLUE: "bg-gradient-to-b from-[#9CACFF] to-[#6D86F5]",
  };

  const nameTextColor =
    putData?.cardThema === "BLUE" ? "text-white" : "text-black";

  const handleColorChange = (newColor: "PINK" | "MINT" | "YELLOW" | "BLUE") => {
    if (setPutData && putData?.cardThema) {
      setPutData({ ...putData, cardThema: newColor }); // 색상 변경만 처리
    }
    // 색상 변경
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const calculateWidth = (text: string, font: string): number => {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.style.font = font;
    span.innerText = text || " ";
    document.body.appendChild(span);

    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
  };

  const [inputWidth, setInputWidth] = useState(0);
  const [ageWidth, setAgeWidth] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      const font = getComputedStyle(inputRef.current).font;
      setInputWidth(calculateWidth(putData?.name || oneCard.name || " ", font));
    }
    if (ageRef.current) {
      const font = getComputedStyle(ageRef.current).font;
      setAgeWidth(calculateWidth(`${putData?.age || oneCard.age}세`, font));
    }
  }, [putData?.name, oneCard.name, putData?.age, oneCard.age, isEditing]);

  const handleEditToggle = async () => {
    if (setIsEditing) {
      if (isEditing) {
        try {
          console.log(putData);
          const res = await instance.put(`/api/cards/${oneCard.id}`, {
            ...putData,
            cardThema: putData?.cardThema,
          });
          console.log(res);
        } catch (e) {
          console.error(e);
        }
      }
      setIsEditing(!isEditing); // 편집 상태 토글
    }
  };

  // 편집 모드일 때 렌더링되는 색상 변경 UI
  const renderColorChangeButtons = () => (
    <div className="absolute right-[2.8rem] top-[3.2rem] flex flex-col gap-[1.6rem]">
      <button
        onClick={handleEditToggle}
        className={`rounded-lg ${completeBtn}`}
      >
        완료
      </button>
      <div className="z-10 flex w-full flex-col items-center justify-around gap-[1.4rem]">
        {(["PINK", "YELLOW", "MINT", "BLUE"] as const).map((c) => (
          <button
            key={c}
            onClick={() => handleColorChange(c)}
            className={`z-100 h-[2.8rem] w-[2.8rem] rounded-full border-2 ${btnColor[c]} ${
              putData?.cardThema === c ? "border-white" : "border-transparent"
            } ${isEditing ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
          ></button>
        ))}
      </div>
    </div>
  );

  const handleInputChange = (
    field: keyof PutCardProps,
    value: string | number,
  ) => {
    if (setPutData && putData) {
      setPutData({ ...putData, [field]: value });
    }
  };

  return (
    <div
      className={`"flex flex-col gap-[0.4rem] rounded-[2rem] px-[2.8rem] pt-[2.4rem] ${backColorTop[selectedColor]}`}
    >
      <div className="flex h-[4.1rem] justify-between">
        <div
          className={`flex w-full items-center gap-[1.2rem] ${nameTextColor}`}
        >
          <span className="text-headline-2">
            {isEditing ? (
              <input
                ref={inputRef}
                value={putData?.name || ""}
                style={{ width: `${inputWidth}px` }}
                name="name"
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="inline bg-transparent focus:outline-none"
                maxLength={6}
              />
            ) : (
              <span> {oneCard?.name}</span>
            )}
          </span>
          <span className="text-subhead-med">
            {isEditing ? (
              <input
                ref={ageRef}
                value={`${putData?.age || 0}세`}
                name="age"
                style={{ width: `${ageWidth}px` }}
                onChange={(e) =>
                  handleInputChange("age", parseInt(e.target.value, 10))
                }
                className="bg-transparent focus:outline-none"
                maxLength={4}
              />
            ) : (
              <span>{oneCard?.age}세</span>
            )}
          </span>
        </div>
        <div className="flex h-[4.1rem] gap-[1.2rem]">
          {isFull &&
            (!isEditing ? (
              <>
                {isStorage && (
                  <button
                    onClick={handleEditToggle}
                    className="h-[2.4rem] w-[2.4rem]"
                  >
                    <Image
                      src={pencilImageUrl}
                      alt="편집 아이콘"
                      width={24}
                      height={24}
                      className="mb-[1.7rem] cursor-pointer"
                    />
                  </button>
                )}
                <button onClick={handleDownload} className="w-[2.4rem]">
                  <Image
                    src={downImageUrl}
                    alt="다운로드 아이콘"
                    width={26}
                    height={26}
                    className="mb-[1.7rem] w-[2.4rem] cursor-pointer"
                  />
                </button>
              </>
            ) : (
              renderColorChangeButtons()
            ))}
        </div>
      </div>
      <div className="mb-[1.8rem] mt-[0.4rem] flex gap-[1.2rem]">
        <div className="relative flex h-full items-center gap-[0.4rem]">
          <div className="flex h-full flex-col justify-between">
            <Image
              src={majorImageUrl}
              alt="전공 아이콘"
              width={24}
              height={24}
            />
          </div>
          <div className={`text-body-2-med ${nameTextColor} w-[10.5rem]`}>
            {isEditing ? (
              <textarea
                value={putData?.major || ""}
                name="major"
                onChange={(e) => handleInputChange("major", e.target.value)}
                className="absolute top-[0.2rem] bg-transparent focus:outline-none"
                maxLength={11}
              />
            ) : (
              <span className="absolute top-[0.2rem]">{oneCard?.major}</span>
            )}
          </div>
        </div>
        <div className="relative flex items-center gap-[0.7rem]">
          {isEditing ? (
            <>
              <div className={`text-body-2-bold ${mbtiColor}`}>MBTI</div>
              <textarea
                value={putData?.mbti || ""}
                name="mbti"
                onChange={(e) => handleInputChange("mbti", e.target.value)}
                className={`absolute -bottom-[1.84rem] ${contentTextColor} left-[4.12rem] bg-transparent text-body-2-med focus:outline-none`}
                maxLength={4}
              />{" "}
            </>
          ) : (
            <>
              <div className={`text-body-2-bold ${mbtiColor}`}>
                {oneCard.mbti ? "MBTI" : ""}
              </div>
              <div className={contentTextColor}>{oneCard.mbti}</div>
            </>
          )}
        </div>
      </div>
      <Image src={graphicImageUrl} alt="그래픽 이미지" />
    </div>
  );
};
export default CardTop;
