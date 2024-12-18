import ProfileImage from "../ProfileImage";

const FixedComment = ({ formatTimeWithMeridiem, roomName }) => {
  const fixedComment = {
    commnets: ["방명록에 오신 걸 환영합니다!", "게임 후기와 인사를 남겨보아요"],
    roomDateTime: "2024-10-21 10:00",
  };

  return (
    <div className="flex gap-[0.8rem]">
      <div>
        <ProfileImage size={36} />
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
                  {formatTimeWithMeridiem(fixedComment.roomDateTime)}
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
