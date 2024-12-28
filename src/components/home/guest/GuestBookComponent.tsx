import Image from "next/image";
// import { GuestBookMessage } from "./BookStorage";
import backgroundImage from "@/public/Image/home/pinkBackgroundImage.svg";
import chatImage1 from "@/public/Image/home/chat_1.svg";
import chatImage2 from "@/public/Image/home/chat_2.svg";
import chatImage3 from "@/public/Image/home/chat_3.svg";

interface GuestBookProps {
  name: string; // 팀 이름
  messages: string; // 방명록 미리보기
}

const GuestBookComponent = ({ name, messages }: GuestBookProps) => {
  const chatImage = [chatImage1, chatImage2, chatImage3];
  // 이미지 랜덤하게 렌더링
  const randomChatImage =
    chatImage[Math.floor(Math.random() * chatImage.length)];

  // 최신 방명록 메시지 추출
  // const latestMessage =
  //   messages[messages.length - 1]?.message || "메시지가 없습니다.";

  return (
    <div
      className="relative flex h-[177px] w-[180px] flex-col items-center gap-[1.2rem] bg-cover pt-[1.6rem] shadow-DEFAULT"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-4 text-center text-body-2-bold text-gray-12">
        {name}
      </div>
      <div className="absolute bottom-[4.1rem] left-1/2 w-[13.2rem] -translate-x-1/2">
        <Image src={randomChatImage} alt="guestbook" />
      </div>
      <div className="absolute bottom-[1.6rem] h-[1.7rem] w-[13.2rem] overflow-hidden text-ellipsis whitespace-nowrap text-caption-med text-gray-9">
        {messages || "메시지가 없습니다."}
      </div>
    </div>
  );
};

export default GuestBookComponent;
