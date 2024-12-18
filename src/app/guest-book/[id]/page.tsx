"use client";
import FixedComment from "@/src/components/guest-book/FixedComment";
import MyTalk from "@/src/components/guest-book/MyTalk";
import YourTalk from "@/src/components/guest-book/YourTalk";
import CommnetInput from "@/src/components/guest-book/CommentInput";
import { useState } from "react";

const Page = () => {
  const [commentValue, setCommentValue] = useState("");
  const Date = "2024년 10월 21일";
  const roomName = "멋쟁이 데모팀";
  function formatTimeWithMeridiem(dateTime: string) {
    const time = dateTime.split(" ")[1]; // 시간 추출
    const [hour, minute] = time.split(":").map(Number); // 시, 분 나누기

    const meridiem = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 || 12; // 12시간 형식으로 변환

    return `${meridiem} ${formattedHour}:${minute.toString().padStart(2, "0")}`;
  }

  const guestBookData = [
    {
      guestBookId: "1",
      isOwnerGuestBook: true, // 본인이 작성한 방명록만 true, 나머지는 false
      sparkUserName: "작성자 이름",
      guestBookContent: "내 방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "2",
      isOwnerGuestBook: false,
      sparkUserName: "이름이름",
      guestBookContent: "너 방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "3",
      isOwnerGuestBook: false,
      sparkUserName: "이름이름",
      guestBookContent: "방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
  ];

  return (
    <div className="-mx-[2rem] flex h-[100vh] w-[calc(100%+4rem)] flex-col items-center bg-gray-1">
      <div className="mb-[2rem] mt-[2.8rem] rounded-[1.2rem] border-[0.1rem] border-gray-7 px-[0.7rem] py-[0.3rem] text-caption-med text-gray-7">
        {Date}
      </div>
      <div className="mx-[2rem] flex w-[calc(100%-4rem)] flex-1 flex-col">
        <FixedComment
          roomName={roomName}
          formatTimeWithMeridiem={formatTimeWithMeridiem}
        />
        {/* Guest Book Data */}
        <div className="mt-[1.6rem] flex flex-col gap-[1.6rem]">
          {guestBookData.map((data) =>
            data.isOwnerGuestBook ? (
              <MyTalk
                key={data.guestBookId}
                userName={data.sparkUserName}
                content={data.guestBookContent}
                dateTime={data.guestBookDateTime}
              />
            ) : (
              <YourTalk
                key={data.guestBookId}
                userName={data.sparkUserName}
                content={data.guestBookContent}
                dateTime={data.guestBookDateTime}
                formatTimeWithMeridiem={formatTimeWithMeridiem}
              />
            ),
          )}
        </div>
      </div>
      <CommnetInput
        commentValue={commentValue}
        setCommentValue={setCommentValue}
      />
    </div>
  );
};

export default Page;
