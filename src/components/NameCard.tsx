import majorIcon from "@/public/nameCard/major.svg";
import Image from "next/image";

type NameCardProps = {
  teamName: string;
  name: string;
  age: number;
  major: string;
  mbti: string;
  hobby: string;
  lookAlike: string;
  selfDescription: string;
  tmi: string;
  selectedCategory: string | null; // 부모에서 전달받은 상태
  onCategorySelect: (category: string) => void; // 부모에서 전달받은 상태 변경 함수
};

const NameCard: React.FC<NameCardProps> = ({
  teamName,
  name,
  age,
  major,
  mbti,
  hobby,
  lookAlike,
  selfDescription,
  tmi,
  selectedCategory,
  onCategorySelect,
}) => {
  // 각 항목의 순서 정의
  const categories = [
    { key: "엠비티아이", value: mbti },
    { key: "취미", value: hobby },
    { key: "닮은꼴", value: lookAlike },
    { key: "나는 이런 사람이야", value: selfDescription },
    { key: "TMI", value: tmi },
  ];

  /////* 여기 부분 부모 컴포넌트로 *////

  // 컴포넌트 내부에서 상태 관리
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // // 카테고리 클릭 시 선택 상태 변경
  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory((prevCategory) =>
  //     prevCategory === category ? null : category,
  //   );
  // };

  ///*여기까지 부모 컴포넌트로 *///

  // 각 카테고리 항목에 대해 상태 가져오기
  const getCategoryStatus = (category: string, value: string | null) => {
    if (selectedCategory === category) {
      return "active";
    }
    return value ? "filled" : "default";
  };

  const getTextColor = (
    category: string,
    value: string | null,
    index: number,
  ) => {
    const selectedIndex = categories.findIndex(
      (cat) => cat.key === selectedCategory,
    );
    if (getCategoryStatus(category, value) === "active") {
      return "text-main-pink";
    }

    if (selectedIndex === -1 || index < selectedIndex) {
      return "text-gray-12";
    }
    return "text-gray-7";
  };

  const getCategoryValue = (
    category: string,
    value: string | null,
    index: number,
  ) => {
    const selectedIndex = categories.findIndex(
      (cat) => cat.key === selectedCategory,
    );
    if (selectedIndex === -1 || index < selectedIndex) {
      // 이전 항목은 실제 값 출력
      return value || <span className="text-gray-5"></span>;
    }
    if (index > selectedIndex) {
      // 이후 항목은 "아직 순서가 아니에요!" 출력
      return <span className="text-gray-5">아직 순서가 아니에요!</span>;
    }
    return <span className="text-gray-5"></span>;
  };

  return (
    <div className="flex h-[30rem] flex-col rounded-xl bg-white px-[1.2rem] py-[1.6rem] shadow">
      <div className="mx-[0.8rem] my-[0.4rem]">
        <div className="mb-[0.8rem] text-caption-bold text-main-pink">
          {teamName}
        </div>
        <div className="flex items-center gap-[1.2rem]">
          <div className="text-headline-2">{name}</div>
          <div className="text-subhead-med">{age}세</div>
        </div>

        <div className="flex items-center justify-between gap-[2.4rem]">
          {/* 전공 항목 */}
          <div
            className={`flex w-auto flex-1 items-center gap-[0.4rem] rounded-[0.4rem] py-[0.4rem] ${
              getCategoryStatus("전공", major) === "active"
                ? "bg-sub-palePink"
                : ""
            }`}
            onClick={() => onCategorySelect("전공")}
          >
            <Image src={majorIcon} alt="전공 아이콘" width={24} height={24} />
            <div className="flex-1 gap-[0.4rem] px-[0.5rem] text-right text-body-2-med text-black">
              {getCategoryStatus("전공", major) === "active" ? "" : major || ""}
            </div>
          </div>

          {/* MBTI 항목 */}
          <div
            className={`flex flex-1 items-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
              getCategoryStatus("엠비티아이", mbti) === "active"
                ? "bg-sub-palePink"
                : ""
            }`}
            onClick={() => onCategorySelect("엠비티아이")}
          >
            <div
              className={`text-body-1-bold ${getTextColor("엠비티아이", mbti, 0)}`}
            >
              MBTI
            </div>
            <div className="text-body-1-med text-gray-10">
              {getCategoryValue("엠비티아이", mbti, 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="my-1 h-[0.1rem] w-full bg-gray-4"></div>

      <div className="mx-[0.4rem] flex h-[15.5rem] flex-1 flex-col gap-[0.4rem]">
        {/* 취미 항목 */}
        <div
          className={`flex items-center justify-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
            getCategoryStatus("취미", hobby) === "active"
              ? "bg-sub-palePink"
              : ""
          }`}
          onClick={() => onCategorySelect("취미")}
        >
          <div className={`text-body-1-bold ${getTextColor("취미", hobby, 1)}`}>
            취미
          </div>
          <div className="flex-1 text-right text-body-1-med text-gray-10">
            {getCategoryValue("취미", hobby, 1)}
          </div>
        </div>

        {/* 닮은꼴 항목 */}
        <div
          className={`flex items-center justify-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
            getCategoryStatus("닮은꼴", lookAlike) === "active"
              ? "bg-sub-palePink"
              : ""
          }`}
          onClick={() => onCategorySelect("닮은꼴")}
        >
          <div
            className={`text-body-1-bold ${getTextColor("닮은꼴", lookAlike, 2)}`}
          >
            닮은꼴
          </div>
          <div className="flex-1 text-right text-body-1-med text-gray-10">
            {getCategoryValue("닮은꼴", lookAlike, 2)}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex h-full justify-between gap-[0.8rem]">
            {/* 나는 이런 사람이야 항목 */}
            <div
              className={`flex flex-1 flex-col gap-[0.8rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
                getCategoryStatus("나는 이런 사람이야", selfDescription) ===
                "active"
                  ? "bg-sub-palePink"
                  : ""
              }`}
              onClick={() => onCategorySelect("나는 이런 사람이야")}
            >
              <div
                className={`text-body-1-bold ${getTextColor("나는 이런 사람이야", selfDescription, 3)}`}
              >
                나는 이런 사람이야
              </div>

              <div className="flex-1 text-body-1-med tracking-tight">
                {getCategoryValue("나는 이런 사람이야", selfDescription, 3)}
              </div>
            </div>

            {/* TMI 항목 */}
            <div
              className={`flex flex-1 flex-col gap-[0.8rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
                getCategoryStatus("TMI", tmi) === "active"
                  ? "bg-sub-palePink"
                  : ""
              }`}
              onClick={() => onCategorySelect("TMI")}
            >
              <div
                className={`text-body-1-bold ${getTextColor("TMI", tmi, 4)}`}
              >
                TMI
              </div>

              <div className="flex-1 text-body-1-med tracking-tight">
                {getCategoryValue("TMI", tmi, 4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
