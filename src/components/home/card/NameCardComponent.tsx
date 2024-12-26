// 개별 팀 명함
import ProfileImage from "../../ProfileImage";
import { Member } from "./CardStorage";

interface NameCardProps {
  name: string; // 팀 이름
  members: Member[]; // 팀원 목록
}

const NameCardComponent = ({ name, members }: NameCardProps) => {
  const backgroundImage = {
    pink: "/Image/home/pinkBackgroundImage.svg",
    green: "/Image/home/mintBackgroundImage.svg",
    yellow: "/Image/home/yellowBackgroundImage.svg",
    blue: "/Image/home/blueBackgroundImage.svg",
  };
  // 팀의 첫번째 팀원의 색상으로 배경색 지정
  const firstMemberColor = members[0].color;
  // console.log(firstMemberColor);
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage[firstMemberColor as keyof typeof backgroundImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="flex h-[177px] w-[180px] flex-col gap-[1.2rem] bg-cover pt-[1.6rem]"
      style={backgroundStyle}
    >
      <div className="p-4 text-center text-body-2-bold text-gray-12">
        {name}
      </div>
      <div className="flex items-center justify-center gap-[0.4rem]">
        <div className="flex w-[13.2rem]">
          {members.slice(0, 3).map((member, index) => (
            <div
              key={member.id}
              className="-ml-[3.2rem] flex flex-col gap-[0.8rem] text-caption-med text-gray-7 shadow-DEFAULT first:ml-0"
              style={{ zIndex: index + 1 }}
            >
              <ProfileImage
                color={member.color as "pink" | "yellow" | "blue" | "green"}
                alt={member.name}
              />
              <div className="flex items-center text-caption-med text-gray-7">
                {index > 1 ? `${member.name} •••` : member.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NameCardComponent;
