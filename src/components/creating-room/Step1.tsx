import { RoomDataForm } from "@/src/app/creating-room/page";
import InputField from "../creating-card/InputField";
import Button from "../common/Button";

interface Step1Props {
  onNext: () => void;
  formData: RoomDataForm;
  onChange: (data: Partial<RoomDataForm>) => void;
}

const Step1 = ({ onNext, formData, onChange }: Step1Props) => {
  const maxLength = 20; // 최대 글자 수 설정

  return (
    <div className="flex flex-col gap-[38.84rem]">
      <div>
        <h2 className="relative mb-[8rem] text-headline-3 text-black">
          팀 방 이름은 무엇인가요?
          <span className="absolute top-0 text-body-2-med text-main-pink">
            *
          </span>
        </h2>
        <div className="relative">
          <InputField
            id="roomName"
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="팀 방 이름을 입력해 주세요"
            type="text"
            maxLength={maxLength}
          />
          <div className="absolute right-0 mt-[0.8rem] text-caption-med text-gray-6">
            {formData.name.length}/{maxLength}
          </div>
        </div>
      </div>
      <Button onClick={onNext} variant="black">
        다음으로
      </Button>
    </div>
  );
};

export default Step1;
