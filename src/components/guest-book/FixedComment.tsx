import ProfileImage from "../ProfileImage";

interface FixedCommentProps {
  roomName: string;
  formatTimeWithMeridiem: (dateTime: string) => string;
  date: string;
}

const FixedComment = ({
  roomName,
  formatTimeWithMeridiem,
  date,
}: FixedCommentProps) => {
  const fixedComment = {
    commnets: ["방명록에 오신 걸 환영합니다!", "게임 후기와 인사를 남겨보아요"],
    roomDateTime: date,
  };

  // 팀 이름에 따라 랜덤 색상
  const getColorFromString = (
    str: string,
  ): "PINK" | "GREEN" | "YELLOW" | "BLUE" => {
    const colors: ("PINK" | "GREEN" | "YELLOW" | "BLUE")[] = [
      "PINK",
      "GREEN",
      "YELLOW",
      "BLUE",
    ];

    if (!str) {
      // str이 없을 경우 기본 색상 반환
      return "blue";
    }

    const hash = str
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const color = getColorFromString(roomName);

  return (
    <div className="flex gap-[0.8rem]">
      <div>
        <ProfileImage size={36} color={color} />
      </div>
      <div>
        <span className="text-caption-med text-gray-8">{roomName}</span>
        <div className="mt-[0.8rem] flex flex-col gap-[0.4rem]">
          {fixedComment.commnets.map((comment, index) => (
            <div key={index} className="flex gap-[0.4rem]">
              {/* 말풍선 */}
              <div className="flex items-center rounded-[1.2rem] bg-white px-[1.2rem] py-[0.6rem] text-body-1-med text-gray-12">
                {comment}
              </div>
              {/* 날짜 */}
              {index === fixedComment.commnets.length - 1 && (
                <span className="mt-[0.4rem] flex items-end text-caption-med text-gray-6">
                  {formatTimeWithMeridiem(date)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FixedComment;
