import NewIcon from "@/public/guest-book/new.svg";
import Image from "next/image";

const New = () => {
  return (
    <button className="fixed bottom-[9.4rem] right-[1rem] rounded-[1.8rem]">
      <Image src={NewIcon} className="w-[5rem]" alt="새로고침 버튼" />
    </button>
  );
};
export default New;
