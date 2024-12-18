import checkBox from "@/public/guest-book/checkBox.svg";
import Image from "next/image";

type CommentInputProps = {
  commentValue: string;
  setCommentValue: (value: string) => void;
};

const CommnetInput = ({ setCommentValue, commentValue }: CommentInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (commentValue.trim()) {
        setCommentValue(""); // 전송 후 입력 필드 초기화
      }
    }
  };

  return (
    <div className="fixed bottom-0 h-[8.4rem] w-full max-w-[77rem] bg-white">
      <div className="mx-[1.2rem] mt-[0.6rem] flex h-[3.6rem] w-[calc(100%-2.4rem)] gap-[0.8rem] rounded-[2rem] border-[0.1rem] border-gray-6 bg-gray-1 px-[1.2rem]">
        <div className="flex items-center justify-center gap-[0.4rem]">
          <Image src={checkBox} alt="체크박스" />
          <span className="text-caption-med text-gray-6">익명</span>
        </div>
        <input
          placeholder="내용을 작성해 주세요"
          type="text"
          aria-label="댓글 입력 필드" // 접근성 향상을 위해 aria-label 추가
          className="search-reset flex-1 bg-transparent text-body-1-med text-gray-12 placeholder-gray-4 focus:outline-none"
          onChange={handleChange}
          onKeyDown={handleKeyPress} // 키 입력 이벤트 핸들러 추가
          value={commentValue}
        />
      </div>
    </div>
  );
};

export default CommnetInput;
