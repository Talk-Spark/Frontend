import ProfileImage from "../ProfileImage";

// Defining the types for the component props
interface YourTalkProps {
  formatTimeWithMeridiem: (dateTime: string) => string;
  content: string;
  userName: string;
  dateTime: string;
  color: "PINK" | "YELLOW" | "MINT" | "BLUE"; // 추후 색상 명 변경 필요
}

const YourTalk = ({
  formatTimeWithMeridiem,
  content,
  userName,
  dateTime,
  color,
}: YourTalkProps) => {
  return (
    <div className="flex gap-[0.8rem]">
      <div>
        <ProfileImage
          size={36}
          color={color}
        />
      </div>
      <div>
        <span className="text-caption-med text-gray-8">{userName}</span>
        <div className="mt-[0.8rem] flex flex-col gap-[0.4rem]">
          <div className="flex gap-[0.4rem]">
            {/* 말풍선 */}
            <div className="flex items-center rounded-[1.2rem] bg-white px-[1.2rem] py-[0.6rem] text-body-1-med text-gray-12">
              {content}
            </div>
            {/* 날짜 */}
            <span className="mt-[0.4rem] flex items-end text-caption-med text-gray-6">
              {formatTimeWithMeridiem(dateTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourTalk;
