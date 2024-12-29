import majorIcon from "@/public/nameCard/major.svg";
import Image from "next/image";
import { FieldType } from "./flow/BeforeSelect";

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
  onCategorySelect?: (category: string) => void; // 부모에서 전달받은 상태 변경 함수
  fieldHoles : FieldType[];
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
  onCategorySelect = ()=>{},
  fieldHoles
}) => {
  // 각 항목의 순서 정의
  const categories = [
    { key: "엠비티아이", value: mbti },
    { key: "취미", value: hobby },
    { key: "닮은꼴", value: lookAlike },
    { key: "나는 이런 사람이야", value: selfDescription },
    { key: "TMI", value: tmi },
  ];

  // 각 카테고리 항목에 대해 상태 가져오기 (active와 hole을 주로 사용)
  const getCategoryStatus = (category: string) => {
    console.log(category);
    console.log(selectedCategory);

    const isHole = fieldHoles.includes(selectedCategory as FieldType);

    if (selectedCategory === category) {
      return "active";
    }else if(isHole){
      return "hole";
    }else{
      return "filled";
    }
  };

  const getTextColor = (
    category: string,
  ) => {
    const categoryStatus = getCategoryStatus(category);
    if (categoryStatus=== "active") {
      return "text-main-pink";
    } else if(categoryStatus === "hole"){
      return "text-gray-7"; //아직 순서가 아니에요 텍스트 색깔
    } else{
      return "text-gray-12"; //공개된 내용에 대한 텍스트 색
    }
  };

  //todo: 이거 아직 완전하지 않음 (내용 잘 뜨는지 확인 필요)
  const getCategoryValue = (
    category: string, //문자열로 실제 카테고리명을 넘겨야 함
    value: string | null, //실제 value (근데 상황에 따라서 value를 렌더링 안하기도 함)
  ) => {
    const categoryStatus = getCategoryStatus(category);

    if (categoryStatus=== "active") {
      return <span className="text-gray-5"></span>;
    } else if(categoryStatus === "hole"){
      return <span className="text-gray-5">아직 순서가 아니에요!</span>; //아직 순서가 아니에요 텍스트 색
    } else{
      return value || <span className="text-gray-5"></span>; //공개된 내용에 대한 텍스트 내용
    }
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
              getCategoryStatus("major") === "active"
                ? "bg-sub-palePink"
                : ""
            }`}
            onClick={() => onCategorySelect("전공")}
          >
            <Image src={majorIcon} alt="전공 아이콘" width={24} height={24} />
            <div className="flex-1 gap-[0.4rem] px-[0.5rem] text-right text-body-2-med text-black">
              {getCategoryStatus(major) === "active" ? "" : major || ""}
            </div>
          </div>

          {/* MBTI 항목 */}
          <div
            className={`flex flex-1 items-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
              getCategoryStatus("mbti") === "active"
                ? "bg-sub-palePink"
                : ""
            }`}
            onClick={() => onCategorySelect("엠비티아이")}
          >
            <div
              className={`text-body-1-bold ${getTextColor("mbti")}`}
            >
              MBTI
            </div>
            <div className="text-body-1-med text-gray-10">
              {getCategoryValue("mbti", mbti)}
            </div>
          </div>
        </div>
      </div>

      <div className="my-1 h-[0.1rem] w-full bg-gray-4"></div>

      <div className="mx-[0.4rem] flex h-[15.5rem] flex-1 flex-col gap-[0.4rem]">
        {/* 취미 항목 */}
        <div
          className={`flex items-center justify-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
            getCategoryStatus("hobby") === "active"
              ? "bg-sub-palePink"
              : ""
          }`}
          onClick={() => onCategorySelect("취미")}
        >
          <div className={`text-body-1-bold ${getTextColor("hobby")}`}>
            취미
          </div>
          <div className="flex-1 text-right text-body-1-med text-gray-10">
            {getCategoryValue("hobby", hobby)}
          </div>
        </div>

        {/* 닮은꼴 항목 */}
        <div
          className={`flex items-center justify-center gap-[1.2rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
            getCategoryStatus("lookAlike") === "active"
              ? "bg-sub-palePink"
              : ""
          }`}
          onClick={() => onCategorySelect("닮은꼴")}
        >
          <div
            className={`text-body-1-bold ${getTextColor("lookAlike")}`}
          >
            닮은꼴
          </div>
          <div className="flex-1 text-right text-body-1-med text-gray-10">
            {getCategoryValue("lookAlike", lookAlike)}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex h-full justify-between gap-[0.8rem]">
            {/* 나는 이런 사람이야 항목 */}
            <div
              className={`flex flex-1 flex-col gap-[0.8rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
                getCategoryStatus("selfDescription") ===
                "active"
                  ? "bg-sub-palePink"
                  : ""
              }`}
              onClick={() => onCategorySelect("나는 이런 사람이야")}
            >
              <div
                className={`text-body-1-bold ${getTextColor("selfDescription")}`}
              >
                나는 이런 사람이야
              </div>

              <div className="flex-1 text-body-1-med tracking-tight">
                {getCategoryValue("selfDescription", selfDescription)}
              </div>
            </div>

            {/* TMI 항목 */}
            <div
              className={`flex flex-1 flex-col gap-[0.8rem] rounded-[0.4rem] px-[0.4rem] py-[0.4rem] ${
                getCategoryStatus("tmi") === "active"
                  ? "bg-sub-palePink"
                  : ""
              }`}
              onClick={() => onCategorySelect("tmi")}
            >
              <div
                className={`text-body-1-bold ${getTextColor("tmi")}`}
              >
                TMI
              </div>

              <div className="flex-1 text-body-1-med tracking-tight">
                {getCategoryValue("tmi", tmi)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
