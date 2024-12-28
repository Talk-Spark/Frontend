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
  cardThema: "PINK" | "YELLOW" | "MINT" | "BLUE";
}

interface RoomDataProps {
  roomId: number;
  roomName: string;
  roomDateTime: string;
  guestBookData: GuestBookDataProps[];
  guestBookFavorited: boolean;
}

const defaultRoom: RoomDataProps = {
  roomId: 0,
  roomName: "",
  roomDateTime: "",
  guestBookData: [],
  guestBookFavorited: false,
};

const Page = () => {
  const [commentValue, setCommentValue] = useState("");
  const [guestDetailData, setGuestDetailData] =
    useState<RoomDataProps>(defaultRoom);

  const { id } = useParams(); // roomId 파라미터 가져온 후 get
  const roomId = id ? Number(id) : 0;

  /* 방명록 내용 조회하기 (상세정보) */
  const fetchGuestBookData = async () => {
    if (roomId) {
      try {
        const response: AxiosResponse<{
          status: number;
          message: string;
          data: RoomDataProps;
        }> = await instance.get(`/api/guest-books/${roomId}`);
        const resData = response.data.data;
        setGuestDetailData(resData);
        console.log(guestDetailData);
      } catch (error) {
        console.error("Error fetching guest book data:", error);
      }
    }
  };

  useEffect(() => {
    fetchGuestBookData();
  }, []);

  const date = guestDetailData ? guestDetailData.roomDateTime : "";
  const roomName = guestDetailData ? guestDetailData.roomName : "";

  const formatDate = (dateString: string) => {
    if (!dateString) return "날짜 정보 없음"; // dateString이 비어있으면 기본값 반환
    const [year, month, day] = dateString.split(" ")[0].split("-");
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  function formatTimeWithMeridiem(dateTime: string) {
    if (!dateTime || !dateTime.includes(" ")) return "시간 정보 없음"; // dateTime이 비어있으면 기본값 반환
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
    {
      guestBookId: "1",
      isOwnerGuestBook: true, // 본인이 작성한 방명록만 true, 나머지는 false
      sparkUserName: "작성자 이름",
      guestBookContent: "내 방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "2",
      isOwnerGuestBook: true,
      sparkUserName: "이름이름",
      guestBookContent: "너 방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "4",
      isOwnerGuestBook: true,
      sparkUserName: "이름이름",
      guestBookContent: "방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "5",
      isOwnerGuestBook: true,
      sparkUserName: "이름이름",
      guestBookContent: "방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "6",
      isOwnerGuestBook: true,
      sparkUserName: "이름이름",
      guestBookContent: "방명록작성!!!!",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "67",
      isOwnerGuestBook: true,
      sparkUserName: "이름이름",
      guestBookContent: "방명록작성!!!  입니당~",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
    {
      guestBookId: "8",
      isOwnerGuestBook: true,
      sparkUserName: "이름이름",
      guestBookContent:
        "너무 재밌었어요~~ 또만나요!!! 너무 재밌었어요~~ 또만나요 너무 재밌었어요 다음에 또만나요 너무 재밌었어요~~  또만나요",
      guestBookDateTime: "2024-11-03 14:30:15",
    },
  ];

  return (
    <div className="relative h-[100vh]">
      <div className="fixed top-0 z-10 -mx-[2rem] w-[calc(100%+4rem)]">
        <Header title={roomName} padding={true} showButton1={true} />
      </div>
      <div className="-mx-[2rem] flex w-[calc(100%+4rem)] flex-col items-center bg-gray-1 pb-[10.4rem]">
        <div className="mb-[2rem] mt-[8rem] rounded-[1.2rem] border-[0.1rem] border-gray-7 px-[0.7rem] py-[0.3rem] text-caption-med text-gray-7">
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
            {guestDetailData?.guestBookData?.length > 0 ? (
              guestDetailData?.guestBookData.map((data) =>
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
              )
            ) : (
              <p className="text-center text-gray-500"></p>
            )}
          </div>
        </div>
        <CommnetInput
          commentValue={commentValue}
          setCommentValue={setCommentValue}
          roomId={roomId}
          fetchGuestBookData={fetchGuestBookData}
        />
      </div>
    </div>
  );
};

export default Page;
