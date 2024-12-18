const MyTalk = ({ userName, content, dateTime }) => {
  return (
    <div className="flex flex-col items-end">
      {/* 말풍선 */}
      <div className="flex items-end gap-[0.4rem]">
        {/* 날짜 */}
        <span className="text-caption-med text-gray-6">
          {new Date(dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {/* 메시지 */}
        <div className="rounded-[1.2rem] bg-sub-palePink px-[1.2rem] py-[0.6rem] text-body-1-med text-gray-12">
          {content}
        </div>
      </div>
    </div>
  );
};

export default MyTalk;
