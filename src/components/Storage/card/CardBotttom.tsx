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
  cardThema?: "PINK" | "MINT" | "YELLOW" | "BLUE";
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

const CardBottom = ({
  oneCard = defaultCard,
  putData,
  contentTextColor = "",
  setPutData,
  isEditing = false,
}: CardDetailDataProps) => {
  const backColorBottom: Record<string, string> = {
    PINK: "bg-gradient-to-b from-[#FFA6CA] to-[#FF80B4]",
    MINT: "bg-gradient-to-b from-[#66F5DC] to-[#11EBC5]",
    YELLOW: "bg-gradient-to-b from-[#FEE485] to-[#FDD853]",
    BLUE: "bg-gradient-to-b from-[#6D86F5] to-[#3D5BF5]",
  };

  const selectedColor = putData?.cardThema ? putData.cardThema : oneCard.cardThema;
  const categoryColor =
  selectedColor === "BLUE"
      ? "text-body-2-bold text-white"
      : " text-body-2-bold text-gray-12";

  const handleInputChange = (field: keyof PutCardProps, value: string) => {
    if (setPutData && putData) {
      setPutData({ ...putData, [field]: value });
    }
  };

  const inputStyle = `${contentTextColor} h-[4rem]`;
  const renderField = (
    label: string,
    field: keyof PutCardProps,
    value: string | undefined,
    maxLength: number,
  ) => (
    <div className="flex flex-1 flex-col gap-[0.4rem]">
      <span className={categoryColor}>{label}</span>
      {isEditing ? (
        <textarea
          className={`overflow-hidden bg-transparent focus:outline-none ${inputStyle}`}
          value={putData?.[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          maxLength={maxLength}
        />
      ) : (
        <p className={inputStyle}>{value}</p>
      )}
    </div>
  );

  return (
    <div
      className={`flex h-[19.2rem] gap-[2.7rem] rounded-[20px] px-[2.8rem] py-[2.4rem] ${backColorBottom[selectedColor]}`}
    >
      <div className={`flex w-[12.6rem] flex-1 flex-col gap-[1.6rem]`}>
        {renderField("취미", "hobby", oneCard.hobby, 15)}
        {renderField("TMI", "tmi", oneCard.tmi, 20)}
      </div>
      <div className="flex w-[12.6rem] flex-1 flex-col gap-[1.6rem]">
        {renderField("닮은 꼴", "lookAlike", oneCard.lookAlike, 15)}
        {renderField("나는 이런 사람이야", "slogan", oneCard.slogan, 20)}
      </div>
    </div>
  );
};
export default CardBottom;
