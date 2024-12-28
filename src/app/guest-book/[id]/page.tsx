"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FixedComment from "@/src/components/guest-book/FixedComment";
import MyTalk from "@/src/components/guest-book/MyTalk";
import YourTalk from "@/src/components/guest-book/YourTalk";
import CommnetInput from "@/src/components/guest-book/CommentInput";
import Header from "@/src/components/Headers/Header";
import { AxiosResponse } from "axios";
import { instance } from "@/src/apis";

interface GuestBookDataProps {
  guestBookId: number;
  sparkUserName: string;
  guestBookContent: string;
  guestBookDateTime: string;
  ownerGuestBook: boolean;
  cardThema: "pink" | "yellow" | "green" | "blue";
}

interface RoomDataProps {
  roomId: number;
  roomName: string;
  roomDateTime: string;
  guestBookData: GuestBookDataProps[];
  guestBookFavorited: boolean;
}

const Page = () => {
  const [commentValue, setCommentValue] = useState("");
  const [guestDetailData, setGuestDetailData] = useState<RoomDataProps | null>(
    null,
  );
  const [sendData, setSendData] = useState(false);

  const { id } = useParams(); // roomId 파라미터 가져온 후 get

  /* 방명록 내용 조회하기 (상세정보) */
  const fetchGuestBookData = async () => {
    if (id) {
      try {
        const response = await instance.get<RoomDataProps>(
          `/api/guest-books/${id}`,
        );
        setGuestDetailData(response.data);
      } catch (error) {
        console.error("Error fetching guest book data:", error);
      }
    }
  };

  useEffect(() => {
    fetchGuestBookData();
  }, [sendData]);

  const date = guestDetailData ? guestDetailData.roomDateTime : "";
  const roomName = guestDetailData ? guestDetailData.roomName : "";

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split(" ")[0].split("-");
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  function formatTimeWithMeridiem(dateTime: string) {
    const time = dateTime.split(" ")[1];
    const [hour, minute] = time.split(":").map(Number);
    const meridiem = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 || 12;

    return `${meridiem} ${formattedHour}:${minute.toString().padStart(2, "0")}`;
  }

  const guestBookData: {
    guestBookId: string;
    isOwnerGuestBook: boolean;
    sparkUserName: string;
    guestBookContent: string;
    guestBookDateTime: string;
  }[] = [
    // 더미데이터
  ];

  return (
    <div>
      <Header title={roomName} padding={false} showButton1={true} />
      <div className="-mx-[2rem] flex h-[100vh] w-[calc(100%+4rem)] flex-col items-center bg-gray-1">
        <div className="mb-[2rem] mt-[2.8rem] rounded-[1.2rem] border-[0.1rem] border-gray-7 px-[0.7rem] py-[0.3rem] text-caption-med text-gray-7">
          {formatDate(date)}
        </div>
        <div className="mx-[2rem] flex w-[calc(100%-4rem)] flex-1 flex-col">
          <FixedComment
            roomName={roomName}
            formatTimeWithMeridiem={formatTimeWithMeridiem}
            date={date}
          />
          {/* Guest Book Data */}
          <div className="mt-[1.6rem] flex flex-col gap-[1.6rem]">
            {guestDetailData?.guestBookData.map((data) =>
              data.ownerGuestBook ? (
                <MyTalk
                  key={data.guestBookId}
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
                  color={data.cardThema}
                />
              ),
            )}
          </div>
        </div>
        <CommnetInput
          commentValue={commentValue}
          setCommentValue={setCommentValue}
          roomId={guestDetailData?.roomId}
          setSendData={setSendData}
        />
      </div>
    </div>
  );
};

export default Page;
