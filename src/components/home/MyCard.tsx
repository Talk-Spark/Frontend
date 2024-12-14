import { ArrowBackIos } from "@mui/icons-material";
import StorageNameCard from "../StorageNameCard";

const MyCard = () => {
  return (
    <div className="my-[3.2rem] flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <div className="text-headline-3 text-black">이름이름 님의 명함</div>
        <div className="flex items-center text-body-1-med text-gray-7">
          내 명함
          <ArrowBackIos
            style={{ fontSize: "2.2rem", transform: "rotate(180deg)" }}
            className="text-gray-7"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <StorageNameCard
          teamName="톡스파크"
          name="이름이름"
          age={23}
          major="컴퓨터공학"
          color="blue"
        />
      </div>
    </div>
  );
};

export default MyCard;
