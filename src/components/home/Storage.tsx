import { useState } from "react";
import CardStorage from "./card/CardStorage";

const Storage = () => {
  const [activeTab, setActiveTab] = useState<"namecard" | "guestbook">(
    "namecard",
  );

  return (
    <div className="mb-[4.8rem] flex w-[33.5rem] flex-col">
      <div className="mb-[0.8rem] text-headline-3 text-black">보관함</div>
      <div className="mb-[1.2rem] flex justify-between text-center text-subhead-bold">
        <div
          className={`flex-1 cursor-pointer ${activeTab === "namecard" ? "text-black" : "text-gray-5"}`}
          onClick={() => setActiveTab("namecard")}
        >
          명함
        </div>
        <div
          className={`flex-1 cursor-pointer ${activeTab === "guestbook" ? "text-black" : "text-gray-5"}`}
          onClick={() => setActiveTab("guestbook")}
        >
          방명록
        </div>
      </div>
      <div className="relative mb-[2.4rem] h-[4px] w-[33.5rem] rounded-[4rem] bg-gray-3">
        <span
          className={`absolute h-full w-[16.75rem] rounded-[4rem] bg-main-pink transition-all duration-300 ${
            activeTab === "namecard" ? "left-0" : "left-[16.75rem]"
          }`}
        />
      </div>
      {activeTab === "namecard" ? <CardStorage /> : <GuestBookComponent />}
    </div>
  );
};

// 임시 컴포넌트들 (실제 컴포넌트로 교체 필요)
// const NameCardComponent = () => <div>명함 컴포넌트</div>;
const GuestBookComponent = () => <div>방명록 컴포넌트</div>;

export default Storage;
